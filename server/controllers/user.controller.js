import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Gig } from "../models/gig.model.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const signup = async (req, res) => {
    try {
        const {
            userName: username,
            phnumber,
            gender,
            password,
            fullName: person_name,
            country_code,
            country
        } = req.body;

        if (!username || !phnumber || !gender || !password || !country_code || !country) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required details"
            });
        }


        // Validate phone number format
        if (!/^[0-9]{10}$/.test(phnumber)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit phone number"
            });
        }

        const existUser = await User.findOne({ username });
        if (existUser) return res.status(400).json({
            success: false,
            message: "Try another username"
        });

        const existPhoneNumber = await User.findOne({ phnumber });
        if (existPhoneNumber) return res.status(400).json({
            success: false,
            message: "This phone number is already in use"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            person_name,
            username,
            phnumber,
            gender,
            password: hashedPassword,
            country_code,
            country
        });

        return res.status(200).json({
            success: true,
            message: "Registration successful",
            user: {
                _id: createdUser._id,
                person_name: createdUser.person_name,
                username: createdUser.username,
                country_code: createdUser.country_code,
                country: createdUser.country,
                isFreelancer: createdUser.isFreelancer
            }
        });

    } catch (error) {
        console.error(`controller/usercontroller/signup: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { userName: username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // Find user without population first to verify credentials
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

        // Now populate all necessary data after authentication
        const currentUser = await User.findById(user._id)
            .populate('gigs')
            .lean();

        // More robust contact filtering
        currentUser.contacts = (currentUser.contacts || []).filter(contact => {
            if (!contact) return false;
            
            // For individual chats
            if (!contact.kyaYeGroupChatH) {
                return contact.users && contact.users.length === 2;
            }
            
            // For group chats
            return true;
        });

        // Sort contacts by latest message timestamp
        currentUser.contacts.sort((a, b) => {
            const aTime = a.latestMessage?.createdAt || a.createdAt;
            const bTime = b.latestMessage?.createdAt || b.createdAt;
            return new Date(bTime) - new Date(aTime);
        });

        const token = jwt.sign(
            { userId: currentUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Remove sensitive data
        const { password: _, __v, ...userData } = currentUser;

        return res
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            .json({
                message: `Welcome ${currentUser.person_name}`,
                currentUser: userData,
                success: true
            });

    } catch (error) {
        console.error(`Error in login: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


export const logout = async (_, res) => {
    try {
        return res.cookie('token', '', { maxAge: 0 }).json({
            message: 'Logged Out successfully',
            success: true
        })
    } catch (error) {
        console.log(`Error: controllers/logout ${error}`);
    }
}

export const getAllFreelancers = async (req, res) => {
    try {
        const freelancers = await User.find({ isFreelancer: true }).select('-password').sort({ updatedAt: -1 });

        if (!freelancers || freelancers.length === 0) {
            return res.status(404).json({ success: false, message: "No freelancers found" });
        }

        return res.status(200).json({
            success: true,
            freelancers
        });

    } catch (error) {
        console.log(`Error: controllers/getAllFreelancers ${error}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const searchByUsername = req.params.username;

        let user = await User.findOne({ username: searchByUsername }).populate({ path: 'gigs', options: { sort: { createdAt: -1 } } })  // Sort gigs by createdAt
            .populate('bookmarks');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(`Error: controllers/getProfile ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

export const addRating = async (req, res) => {
    try {
        const { freelancerId, score } = req.body;
        const userId = req.id; // Logged-in user's ID

        if (!freelancerId || score < 1 || score > 5) {
            return res.status(400).json({ success: false, message: "Invalid rating request." });
        }

        const freelancer = await User.findById(freelancerId);
        if (!freelancer || !freelancer.isFreelancer) {
            return res.status(404).json({ success: false, message: "Freelancer not found." });
        }

        let existingRating = freelancer.ratings.find(rating => rating.user.toString() === userId);
        if (existingRating) {
            existingRating.score = score;
        } else {
            freelancer.ratings.push({ user: userId, score });
        }

        freelancer.averageRating = freelancer.ratings.reduce((sum, r) => sum + r.score, 0) / freelancer.ratings.length;

        await freelancer.save();
        res.status(200).json({
            success: true,
            message: "Rating updated successfully",
            averageRating: freelancer.averageRating,
        });

    } catch (error) {
        console.error(`Error: addRating ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { person_name, username, phnumber, bio, city, state, isFreelancer } = req.body;
        const profilePicture = req.file;

        const currentUser = await User.findById(userId).select('-password');
        if (!currentUser) return res.status(404).json({ success: false, message: "User not found" });

        let cloudResponse;

        // If a new profile picture is uploaded
        if (profilePicture) {
            // 1. Delete the old image from Cloudinary (if it exists)
            if (currentUser.profilePicture) {
                const publicId = currentUser.profilePicture.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            // 2. Upload the new image
            const fileUri = getDatauri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        // Update fields
        if (person_name) currentUser.person_name = person_name;
        if (profilePicture) currentUser.profilePicture = cloudResponse.secure_url;
        if (username) currentUser.username = username;
        if (phnumber) currentUser.phnumber = phnumber;
        if (bio) currentUser.bio = bio;
        if (city) currentUser.city = city;
        if (state) currentUser.state = state;
        if (typeof isFreelancer !== 'undefined') {
            currentUser.isFreelancer = isFreelancer;
        }

        await currentUser.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: 'Profile Updated',
            success: true,
            currentUser
        });

    } catch (error) {
        console.log(`Error: controllers/editProfile ${error}`);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};