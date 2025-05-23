import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
    desc: {type: String, default:''}, //desc == service name change in frontend
    image: {type: String, required: true}, 
    author: {type: mongoose.Schema.ObjectId, ref:'User'}, 
    price: {type: String}, 
    noOfStars: {type: String},
    noOfUsers: [{type: mongoose.Schema.ObjectId}],
    likes: [{type: mongoose.Schema.ObjectId}],
    comments: [{type: mongoose.Schema.ObjectId, ref:'Comment'}] 
}, {timestamps:true});

export const Gig = mongoose.model('Gig', gigSchema);