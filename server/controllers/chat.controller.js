import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

export const createChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }

    try {
        const currentUserId = req.id;

        // Check if contacted user exists
        const contactedUser = await User.findById(userId);
        if (!contactedUser) {
            return res.status(404).json({
                success: false,
                message: "Contacted user not found."
            });
        }

        // Check for existing chat
        const existingChat = await Chat.findOne({
            kyaYeGroupChatH: false,
            users: { $all: [currentUserId, userId] }
        })
            .populate("users", "-password")
            .populate("latestMessage");

        if (existingChat) {
            return res.status(200).json({
                success: true,
                fullChat: existingChat,
                isExisting: true
            });
        }

        // Create new chat
        const newChat = await Chat.create({
            chatName: "sender",
            kyaYeGroupChatH: false,
            users: [currentUserId, userId]
        });

        const fullChat = await Chat.findById(newChat._id)
            .populate('users', '-password');

        // Add chat to both users' contacts using atomic $push
        await User.updateOne(
            { _id: currentUserId },
            { $push: { contacts: newChat._id } }
        );

        await User.updateOne(
            { _id: userId },
            { $push: { contacts: newChat._id } }
        );

        return res.status(201).json({
            success: true,
            fullChat,
            isExisting: false
        });

    } catch (error) {
        console.error("Error in createChat:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};



export const bringChats = async (req, res) => {
    try {
        // const currentUserId = req.user._id; // Use consistent auth ID

        // Find all chats where the current user is a participant
        // const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
         const chats = await Chat.find({ users: req.id })
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 }); // Newest first

        // If you need to populate the sender in latestMessage:
        const populatedChats = await Chat.populate(chats, {
            path: "latestMessage.sender",
            select: "name email profilePicture" // Adjust fields to match your User model
        });

        return res.status(200).json({
            success: true,
            chats: populatedChats // Consistent key naming
        });

    } catch (error) {
        console.error("Error in bringChats:", error); // Log errors
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const createGroupChats = async (req, res) => {
    const { usersList, name } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Group name is required."
        });
    }

    let users;
    try {
        users = typeof usersList === 'string' ? JSON.parse(usersList) : usersList;
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid users list format."
        });
    }

    if (users.length < 2) {
        return res.status(400).json({
            success: false,
            message: "At least 2 members are required."
        });
    }

    // Add creator and deduplicate
    users = [...new Set([...users, req.user._id])];

    try {
        // Validate user IDs
        const validUsers = await User.find({ _id: { $in: users } });
        if (validUsers.length !== users.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid user IDs."
            });
        }

        const groupChat = await Chat.create({
            chatName: name,
            kyaYeGroupChatH: true,
            users: users,
            groupAdmin: req.user._id
        });

        const fullChatGroup = await Chat.findById(groupChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json({
            success: true,
            fullChatGroup
        });

    } catch (error) {
        console.error("Error in createGroupChats:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


export const changeGroupName = async (req, res) => {
    const { chatId, chatName } = req.body;

    // Input validation
    if (!chatId || !chatName) {
        return res.status(400).json({
            success: false,
            message: "Chat ID and new name are required."
        });
    }

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!updatedChat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: `Group name updated to ${chatName}.`,
            updatedChat
        });

    } catch (error) {
        console.error("Error in changeGroupName:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const addMemberToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        // Input validation
        if (!chatId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Chat ID and User ID are required."
            });
        }

        // Check if user exists
        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Get group and verify requester is admin
        const group = await Chat.findById(chatId);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Chat not found."
            });
        }

        // Check admin permissions
        if (group.groupAdmin.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only the group admin can add members."
            });
        }

        // Check if user is already in group
        if (group.users.some(user => user.toString() === userId)) {
            return res.status(400).json({
                success: false,
                message: "User is already in the group."
            });
        }

        // Add user to group
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } }, // Can use $push since we've already checked for duplicates
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json({
            success: true,
            message: "Member added successfully.",
            updatedChat
        });

    } catch (error) {
        console.error("Error in addMemberToGroup:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};



export const removeMemberFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    // Input validation
    if (!chatId || !userId) {
        return res.status(400).json({
            success: false,
            message: "Chat ID and User ID are required"
        });
    }

    try {
        // Check if chat exists and get current group data
        const group = await Chat.findById(chatId);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Verify requester is group admin
        if (group.groupAdmin.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Only group admin can remove members'
            });
        }

        // Check if user is in the group
        if (!group.users.some(user => user.toString() === userId)) {
            return res.status(400).json({
                success: false,
                message: 'User is not in this group'
            });
        }

        // Prevent admin from removing themselves
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Admin cannot remove themselves'
            });
        }

        // Remove user from group
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json({
            success: true,
            message: 'Member removed successfully',
            updatedChat
        });

    } catch (error) {
        console.error("Error in removeFromGroup:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


