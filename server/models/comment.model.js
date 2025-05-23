import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    gig: {type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true}
});

export const Comment = mongoose.model('Comment', commentSchema);