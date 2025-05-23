import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    }
});

const userSchema = new mongoose.Schema({
    person_name: {type: String},
    username: {type: String, required: true, unique: true},
    phnumber: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number.']
    },
    gender:{type:String, enum:['male', 'female'], required:true},
    password:{type:String, required: true},
    profilePicture:{type:String, default:''},
    profileBanner:{type:String, default:''},
    bio:{type:String, default:''},
    city:{type:String, default:''},
    state:{type:String, default:''},
    country_code:{type:String, required: true},
    country:{type:String, required: true},
    services: [{ type: String }],
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    blocklist:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    contacts:[{type:mongoose.Schema.Types.ObjectId, ref:'Chat'}],
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
    gigs:[{type: mongoose.Schema.Types.ObjectId, ref:'Gig'}],
    bookmarks:[{type: mongoose.Schema.Types.ObjectId, ref:'Gig'}],
    isFreelancer: {type: Boolean, default: false}
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);
