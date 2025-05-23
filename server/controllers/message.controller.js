import mongoose from "mongoose";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";


export const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    // Validate input
    if (!content || !content.trim()) {
        return res.status(400).json({
            success: false,
            message: "Message content is required and cannot be empty"
        });
    }

    if (!chatId) {
        return res.status(400).json({
            success: false,
            message: "Invalid chat ID"
        });
    }

    try {
        // Verify chat exists
        const chatExists = await Chat.exists({ _id: chatId });
        if (!chatExists) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        // Create message
        const newMessage = {
            sender: req?.id,
            content: content.trim(),
            chat: chatId
        };

        let message = await Message.create(newMessage);

        // Populate message data
        message = await Message.populate(message, [
            { path: "sender", select: "person_name username profilePicture bio" },
            {
                path: "chat",
                populate: {
                    path: "users",
                    select: "person_name username profilePicture bio"
                }
            }
        ]);

        // Update chat's latest message
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message?._id
        });

        return res.status(201).json({
            success: true,
            message
        });

    } catch (error) {
        console.error("Error in sendMessage:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message
        });
    }
};

// // Initial load
// const response = await fetch(`/api/messages/${chatId}?limit=20`);

// // Load more when scrolling up
// if (scrollTop === 0 && hasMore) {
//     const moreMessages = await fetch(
//       `/api/messages/${chatId}?limit=20&before=${nextCursor}`
//     );
// }


export const callAllMessages = async (req, res) => {
    try {
        const chatId = req?.params?.chatId;
        const currentUserId = req?.user?._id;
        const limit = parseInt(req.query.limit) || 20; // Messages per load
        const before = req.query.before; // Timestamp for older messages

        // Base query
        const query = { chat: chatId };

        // If 'before' parameter exists, fetch older messages
        if (before) {
            query.createdAt = { $lt: new Date(before) };
        }

        // Get messages with scrollable pagination
        let messages = await Message.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .limit(limit)
            .populate('sender', 'person_name _id username profilePicture bio')
            .populate({
                path: 'chat',
                populate: {
                    path: 'users',
                    select: 'person_name username profilePicture bio'
                }
            });

        // Filter recalled messages
        messages = messages.filter(message => {
            if (message?.recallForEveryone) return false;
            if (message?.recallForMe && message?.sender?._id.equals(currentUserId)) return false;
            return true;
        });

        // Determine if more messages are available
        const oldestMessage = messages[messages.length - 1];
        const hasMore = oldestMessage
            ? await Message.exists({
                chat: chatId,
                createdAt: { $lt: oldestMessage.createdAt }
            })
            : false;

        return res.status(200).json({
            success: true,
            messages: messages.reverse(), // Return oldest first for proper display
            pagination: {
                hasMore,
                nextCursor: hasMore ? oldestMessage.createdAt.toISOString() : null,
                limit
            }
        });

    } catch (error) {
        console.error("Error in callAllMessages:", error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch messages',
            // error: process?.env?.NODE_ENV === 'development' ? error?.message : undefined
        });
    }
};

export const addReaction = async (req, res) => {
    try {
        const { messageId, emoji } = req.body;

        // Validate input
        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid message ID"
            });
        }

        if (!emoji || emoji.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Emoji is required"
            });
        }

        // Check if message exists
        const messageExists = await Message.exists({ _id: messageId });
        if (!messageExists) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // Remove existing reaction from same user
        await Message.updateOne(
            { _id: messageId },
            { $pull: { reactions: { userId: req.user._id } } }
        );

        // Add new reaction
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { $push: { reactions: { userId: req.user._id, emoji: emoji.trim() } } },
            { new: true }
        )
        .populate('reactions.userId', 'username profilePicture');

        // Real-time update via Socket.io
        io.to(updatedMessage.chat.toString()).emit('reaction-added', {
            messageId,
            reactions: updatedMessage.reactions
        });

        return res.status(200).json({
            success: true,
            reactions: updatedMessage.reactions
        });

    } catch (error) {
        console.error("Reaction Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add reaction",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { messageId } = req.body;

        // Validate input
        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid message ID"
            });
        }

        // Get message first to access chat ID
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // Check if already read
        if (message.readBy.includes(req.user._id)) {
            return res.status(200).json({
                success: true,
                message: "Message already marked as read"
            });
        }

        // Update read status
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { readBy: req.user._id } },
            { new: true }
        ).populate('readBy', 'username profilePicture');

        // Real-time update via Socket.io
        io.to(message.chat.toString()).emit('message-read', {
            messageId,
            readBy: updatedMessage.readBy,
            readerId: req.user._id
        });

        return res.status(200).json({
            success: true,
            readBy: updatedMessage.readBy
        });

    } catch (error) {
        console.error("Read Receipt Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to mark message as read",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const editMessage = async (req, res) => {
    try {
        const { messageId, newContent } = req.body;

        // Validate input
        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid message ID" 
            });
        }

        if (!newContent || newContent.trim() === "") {
            return res.status(400).json({ 
                success: false, 
                message: "Message content cannot be empty" 
            });
        }

        // Find the message
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ 
                success: false, 
                message: "Message not found" 
            });
        }

        // Check if user is the sender
        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "Only the message sender can edit" 
            });
        }

        // Check 15-minute time limit
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
        if (message.createdAt < fifteenMinutesAgo) {
            return res.status(400).json({ 
                success: false, 
                message: "Messages can only be edited within 15 minutes of sending" 
            });
        }

        // Update message
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { 
                content: newContent.trim(),
                editedAt: new Date() 
            },
            { new: true }
        ).populate('sender', ' person_name bio username profilePicture');

        // Real-time update
        // io.to(message.chat.toString()).emit('message-edited', {
        //     messageId,
        //     newContent: updatedMessage.content,
        //     editedAt: updatedMessage.editedAt
        // });

        return res.status(200).json({
            success: true,
            message: updatedMessage
        });

    } catch (error) {
        console.error("Edit Message Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to edit message",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { messageId, deleteFor } = req.body; // deleteFor: 'everyone' or 'me'

        // Validate input
        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid message ID" 
            });
        }

        if (!deleteFor || !['everyone', 'me'].includes(deleteFor)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid delete type. Use 'everyone' or 'me'" 
            });
        }

        // Find the message
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ 
                success: false, 
                message: "Message not found" 
            });
        }

        // Check permissions
        const isSender = message.sender.toString() === req.user._id.toString();
        const isGroupAdmin = await Chat.exists({
            _id: message.chat,
            groupAdmin: req.user._id
        });

        // Only sender can do "recallForMe"
        if (deleteFor === 'me' && !isSender) {
            return res.status(403).json({ 
                success: false, 
                message: "Only message sender can delete for themselves" 
            });
        }

        // Only sender or admin can do "recallForEveryone"
        if (deleteFor === 'everyone' && !isSender && !isGroupAdmin) {
            return res.status(403).json({ 
                success: false, 
                message: "Only sender or group admin can delete for everyone" 
            });
        }

        // Update message state
        const update = {};
        if (deleteFor === 'everyone') {
            update.recallForEveryone = true;
            update.content = "This message was deleted";
        } else {
            update.recallForMe = true;
        }

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            update,
            { new: true }
        ).populate('sender', 'username profilePicture');

        // Real-time update
        const eventName = deleteFor === 'everyone' 
            ? 'message-deleted-everyone' 
            : 'message-deleted-me';

        // io.to(message.chat.toString()).emit(eventName, {
        //     messageId,
        //     deletedBy: req.user._id,
        //     deleteFor
        // });

        return res.status(200).json({
            success: true,
            message: `Message deleted for ${deleteFor}`,
            updatedMessage
        });

    } catch (error) {
        console.error("Delete Message Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete message",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};