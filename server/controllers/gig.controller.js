import sharp from "sharp"
import path from "path"
import fs, { existsSync } from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import { getRecieverSocketId, io } from '../socket/socket.js';
import { User } from "../models/user.model.js";
import { Gig } from "../models/gig.model.js";
import { Comment } from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addNewGig = async (req, res) => {
    try {
        const { service: desc, price } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({
                message: 'No image uploaded',
                success: false
            });
        }

        const currentUser = await User.findById(authorId);
        if (!currentUser || currentUser.isFreelancer !== true) {
            return res.status(400).json({ success: false, message: "Please activate or reactivate your account" });
        }

        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width: 800, height:800, fit: 'inside'})
        .toFormat('jpeg', {quality:80})
        .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        // Step 1: Create the Gig
        const gig = await Gig.create({
            desc,
            price,
            image: cloudResponse.secure_url,
            author: authorId
        });

        // Step 2: Update User Schema to Add Gig ID
        await User.findByIdAndUpdate(authorId, {
            $push: { gigs: gig._id }
        });

        return res.status(201).json({
            success: true,
            message: "Gig created successfully",
            gig
        });

    } catch (error) {
        console.log(`Error: controller/gigController/addNewGig: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Maybe image format is not accepted.'
        });
    }
};


export const getAllGig = async (req, res) => {
    try {
        const { search, filter } = req.query; // Get search & filter query from frontend
        let gig;

        // Fetch all gig with author data
        gig = await Gig.find()
            .populate({ path: "author", select: "person_name username profilePicture bio isFreelancer ratings city state" })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: { path: "author", select: "person_name username profilePicture" }
            })
            .lean();

        // Filter by search query
        if (search) {
            gig = gig.filter(filteredGig =>
                filteredGig.desc.toLowerCase().includes(search.toLowerCase()) ||
                filteredGig.author.person_name.toLowerCase().includes(search.toLowerCase()) ||
                filteredGig.author.city.toLowerCase().includes(search.toLowerCase()) ||
                filteredGig.author.state.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort by selected filter
        if (filter === "top") {
            gig.sort((a, b) => {
                const ratingA = a.author.ratings.length > 0 
                    ? a.author.ratings.reduce((sum, r) => sum + r.score, 0) / a.author.ratings.length 
                    : 0;
                const ratingB = b.author.ratings.length > 0 
                    ? b.author.ratings.reduce((sum, r) => sum + r.score, 0) / b.author.ratings.length 
                    : 0;
                return ratingB - ratingA; // Sort in descending order (highest rating first)
            });
        } else {
            gig.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Latest gig first
        }

        return res.status(200).json({
            success: true,
            gig
        });
    } catch (error) {
        console.error(`Error in getAllGig: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



export const getFreelancerGig = async (req, res)=>{
    try {
        const authorId = req.id;
        const gigs = await Gig.find({author: authorId}).sort({createdAt: -1})
        .populate({path: 'author', select: 'person_name username profilePicture bio'})
        .populate({
            path: 'comments',
            sort: {createdAt: -1},
            populate: { path: "author", select: "person_name username profilePicture"}
        });
    
    return res.status(200).json({
        success: true,
        gigs
    })  
        
    } catch (error) {
        console.log(` Error: controller/gigController/getFreelancerGig: ${error}`)
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}

export const likeGig = async (req, res)=>{
    try {
        
        const likeKarneWaleUserKiId = req.id;
        const gigId = req.params.id;

        const gig = await Gig.findById(gigId);
        if(!gig) return res.status(404).json({success:false, message: "Gig Not Found"});

        await Gig.updateOne({ _id: gigId }, { $addToSet: { likes: likeKarneWaleUserKiId } });
        await gig.save();

        const currentUser = await User.findById(likeKarneWaleUserKiId).select('person_name username profilePicture');
        const gigOwnerId = gig.author.toString();
        if(gigOwnerId !== likeKarneWaleUserKiId){
            const notification = {
                type: 'like',
                userId: likeKarneWaleUserKiId,
                userDetails: currentUser,
                message: `${currentUser.person_name} liked your work`
            }
        }

        // const gigOwnerSocketId = getRecieverSocketId(gigOwnerId)
        // io.to(gigOwnerSocketId).emit('notification', notification)

        return res.status(200).json({
            success: true,
            message: 'Liked'
        })
        
    } catch (error) {
        console.log(` Error: controller/gigController/likeGig: ${error}`)
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}

export const dislikeGig = async (req, res)=>{
    try {
        
        const dislikeKarneWaleUserKiId = req.id;
        const gigId = req.params.id;

        const gig = await Gig.findById(gigId);
        if(!gig) return res.status(404).json({success:false, message: "Gig Not Found"});

        await Gig.updateOne({ _id: gigId }, { $pull: { likes: dislikeKarneWaleUserKiId } });
        await gig.save();

        const currentUser = await User.findById(dislikeKarneWaleUserKiId).select('person_name username profilePicture');
        const gigOwnerId = gig.author.toString();
        if(gigOwnerId !== dislikeKarneWaleUserKiId){
            const notification = {
                type: 'dislike',
                userId: dislikeKarneWaleUserKiId,
                userDetails: currentUser,
                message: `${currentUser.person_name} disliked your work`
            }
        }

        const gigOwnerSocketId = getRecieverSocketId(gigOwnerId)
        io.to(gigOwnerSocketId).emit('notification', notification)

        return res.status(200).json({
            success: true,
            message: 'disLiked'
        })
        
    } catch (error) {
        console.log(` Error: controller/gigController/likeGig: ${error}`)
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}

export const addComment = async (req, res)=>{
    try {
     
        const gigId = req.params.id;
        const commentWaaleKiId = req.id;
        const {text} = req.body;

        const gig = await Gig.findById(gigId);
        if(!gig) return res.status(404).json({ success: false, message: 'Gig Not Found'});
        if(!text) return res.status(404).json({ success: false, message: 'Text required'});

        const comment = await Comment.create({
            text,
            author: commentWaaleKiId,
            gig: gigId
        })

        await comment.populate({
            path: 'author',
            select: 'person_name username profilePicture'
        })

        gig.comments.push(comment._id);
        await gig.save();

        return res.status(200).json({
            success:true,
            message: 'Comment Added',
            comment,
        })
        
    } catch (error) {
        console.log(` Error: controller/gigController/addComment: ${error}`)
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}

export const editGig = async (req, res) => {
    try {
        const gigId = req.params.id;
        const authorId = req.id;
        const { desc, price } = req.body;
        const image = req.file;

        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ success: false, message: "Gig not found" });

        if (gig.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: "You can only edit your own gig" });
        }

        let updatedImage = gig.image;
        if (image) {
            const currentUser = await User.findById(authorId);
            const uploadDir = path.join(__dirname, "../uploads", `${currentUser._id}gig`);
            if (!existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const outputFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
            const outputPath = path.join(uploadDir, outputFileName);

            await sharp(image.path)
                .resize({ width: 800, height: 800, fit: "inside" })
                .toFormat("jpg", { quality: 80 })
                .toFile(outputPath);

            const baseURL = process.env.BACKEND_URL;
            const relativePath = path.join('uploads', `${currentUser._id}gig`, outputFileName).replace(/\\/g, '/');
            updatedImage = `${baseURL}/${relativePath}`;
        }

        gig.desc = desc || gig.desc;
        gig.price = price || gig.price;
        gig.image = updatedImage;

        await gig.save();

        return res.status(200).json({ success: true, message: "Gig updated successfully", gig });
    } catch (error) {
        console.log(`Error: controller/gigController/editGig: ${error}`);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const authorId = req.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Ensure that only the comment author or gig author can delete the comment
        const gig = await Gig.findById(comment.gig);
        if (!gig) {
            return res.status(404).json({ success: false, message: "Associated gig not found" });
        }

        if (comment.author.toString() !== authorId && gig.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
        }

        // Remove the comment from the gig's comments array
        await Gig.updateOne({ _id: gig._id }, { $pull: { comments: commentId } });

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.log(`Error: controller/gigController/deleteComment: ${error}`);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const getCommentOfPost = async (req,res)=>{
    try {
        const gigId = req.params.id;
        const comments = await Comment.find({gig: gigId}).populate('author', 'person_name username profilePicture');
        if(!comments) return res.status(404).json({success: false, message: 'No comments are found'});
        return res.status(200).json({success: true, comments});

    } catch (error) {
        console.log(` Error: controller/gigController/getCommentOfPost: ${error}`)
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}

export const deleteGig = async (req, res) => {
    try {
        const gigId = req.params.id;
        const authorId = req.id;

        const currentGig = await Gig.findById(gigId);
        if (!currentGig) return res.status(404).json({ success: false, message: 'Gig not found' });

        // Check if the user is the gig author
        if (currentGig.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: 'You can only delete your own gig' });
        }

        // Step 1: Delete the image from Cloudinary (if it exists)
        if (currentGig.image) {
            try {
                // Extract public_id from Cloudinary URL (e.g., "image/upload/v1234567/abc123.jpg")
                const publicId = currentGig.image.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.log("Failed to delete Cloudinary image:", err.message);
                // Continue deletion even if Cloudinary cleanup fails
            }
        }

        // Step 2: Delete the gig from the database
        await Gig.findByIdAndDelete(gigId);

        // Step 3: Remove the gig ID from the user's `gigs` array
        await User.findByIdAndUpdate(authorId, {
            $pull: { gigs: gigId }
        });

        // Step 4: Delete all comments associated with the gig
        await Comment.deleteMany({ gig: gigId });

        return res.status(200).json({
            success: true,
            message: 'Gig deleted successfully'
        });

    } catch (error) {
        console.log(`Error: controller/gigController/deleteGig: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


export const bookmarksPost = async (req, res)=>{
    try {
        
        const gigId = req.params.id;
        const authorId = req.id;

        const gig = await Gig.findById(gigId);
        if(!gig) return res.status(404).json({success: false, message: 'Gig not found'});

        const currentUser = await User.findById(authorId);
        if(currentUser.bookmarks.includes(gig._id)){
            await currentUser.updateOne({$pull: {bookmarks: gig._id}});
            await currentUser.save();
            return res.status(200).json({success: true, message: 'Unmarked'});
        }else{
            await currentUser.updateOne({$addToSet: {bookmarks: gig._id}});
            await currentUser.save();
            return res.status(200).json({success: true, message: 'Marked'});
        }

    } catch (error) {
        console.log(` Error: controller/gigController/bookmarksPost: ${error}`)
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}

