import mongoose from "mongoose";

const messageModel = mongoose.Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    recallForEveryone: { type: Boolean, default: false },
    recallForMe: { type: Boolean, default: false },
    reactions: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, emoji: String }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }]

}, { timestamps: true });

export const Message = mongoose.model("Message", messageModel);