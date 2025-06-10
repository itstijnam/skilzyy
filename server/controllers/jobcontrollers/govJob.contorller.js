import { Govjob } from "../../models/govJob.model.js";
import { User } from "../../models/user.model.js";
import cloudinary from "../../utils/cloudinary.js";
import getDatauri from "../../utils/datauri.js";


export const createGovJob = async (req, res) => {
    try {
        const {
            gov_job_post,
            auth_country,
            gov_job_appl_start,
            gov_job_last_start,
            gov_job_exam_date,
            gov_quick_view,
            gov_detailed_description,
            gov_general_fee,
            gov_female_fee,
            gov_obc_fee,
            gov_scst_fee,
            gov_male_min_age,
            gov_male_max_age,
            gov_female_min_age,
            gov_female_max_age,
            gov_apply_link,
            gov_notification_link
        } = req.body;

        const authorId = req.id;

        const image = req.file;

        // Validate required fields
        if (!gov_job_post) return res.status(400).json({ success: false, message: 'Post required' });
        if (!auth_country) return res.status(400).json({ success: false, message: 'Country required' });
        if (!gov_job_appl_start) return res.status(400).json({ success: false, message: 'Application start date required' });
        if (!gov_job_last_start) return res.status(400).json({ success: false, message: 'Application last date required' });
        if (!gov_quick_view) return res.status(400).json({ success: false, message: 'Quick view required' });
        if (!gov_detailed_description) return res.status(400).json({ success: false, message: 'Detailed description required' });
        if (gov_general_fee == null) return res.status(400).json({ success: false, message: 'General fee required' });
        if (gov_female_fee == null) return res.status(400).json({ success: false, message: 'Female fee required' });
        if (gov_obc_fee == null) return res.status(400).json({ success: false, message: 'OBC fee required' });
        if (gov_scst_fee == null) return res.status(400).json({ success: false, message: 'SC/ST fee required' });
        if (gov_male_min_age == null) return res.status(400).json({ success: false, message: 'Male min age required' });
        if (gov_male_max_age == null) return res.status(400).json({ success: false, message: 'Male max age required' });
        if (gov_female_min_age == null) return res.status(400).json({ success: false, message: 'Female min age required' });
        if (gov_female_max_age == null) return res.status(400).json({ success: false, message: 'Female max age required' });
        if (!gov_apply_link) return res.status(400).json({ success: false, message: 'Apply link required' });
        if (!gov_notification_link) return res.status(400).json({ success: false, message: 'Notification link required' });
        if (!image) return res.status(400).json({ success: false, message: 'Image required' });

        // Validate link formats
        const urlPattern = /^https?:\/\/.+/;
        if (!urlPattern.test(gov_apply_link)) return res.status(400).json({ success: false, message: 'Invalid apply link URL' });
        if (!urlPattern.test(gov_notification_link)) return res.status(400).json({ success: false, message: 'Invalid notification link URL' });

        let cloudResponse;

        // If a new profile picture is uploaded
        if (image) {
            // 2. Upload the new image
            const fileUri = getDatauri(image);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const authUser = await User.findById(authorId);
        if (!authUser) return res.status(400).json({ success: false, message: 'Author not found' });
        if (authUser.username !== process.env.owner_key) return res.status(400).json({ success: false, message: 'Only owner can access' })

        // Save to DB
        const newJob = new Govjob({
            gov_job_image: cloudResponse.secure_url,
            gov_job_post,
            auth_country,
            gov_job_appl_start,
            gov_job_last_start,
            gov_job_exam_date,
            gov_quick_view,
            gov_detailed_description,
            gov_general_fee,
            gov_female_fee,
            gov_obc_fee,
            gov_scst_fee,
            gov_male_min_age,
            gov_male_max_age,
            gov_female_min_age,
            gov_female_max_age,
            gov_apply_link,
            gov_notification_link
        });

        await newJob.save();
        return res.status(201).json({ success: true, message: "Government job created successfully", newJob });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAllGovJob = async (req, res) => {
    try {
        const { auth_country } = req.query;

        const govJobs = await Govjob.find({ auth_country })
            .sort({ updatedAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            govJobs
        });
    } catch (error) {
        console.error("getAllGovJob error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteGovJob = async (req, res) => {
    try {
        const { govJobId } = req.params;

        const authorId = req.body.id;
        const authUser = await User.findById(authorId);
        if (!authUser) return res.status(400).json({ success: false, message: 'Author not found' });
        if (authUser.username !== process.env.owner_key) return res.status(403).json({ success: false, message: 'Only owner can access' });

        const jobToDelete = await Govjob.findById(govJobId);
        if (!jobToDelete) {
            return res.status(404).json({ success: false, message: "Gov job not found" });
        }

        // 🧹 Delete image from Cloudinary if exists
        if (jobToDelete.gov_job_image) {
            const publicId = jobToDelete.gov_job_image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        // Delete job from DB
        await Govjob.findByIdAndDelete(govJobId);

        return res.status(200).json({
            success: true,
            message: "Gov job and associated image deleted successfully",
            deletedJob: jobToDelete
        });

    } catch (error) {
        console.error("deleteGovJob error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const editGovJob = async (req, res) => {
    try {
        const { govJobId } = req.params;
        const {
            id, // user ID
            gov_job_post,
            auth_country,
            gov_job_appl_start,
            gov_job_last_start,
            gov_job_exam_date,
            gov_quick_view,
            gov_detailed_description,
            gov_general_fee,
            gov_female_fee,
            gov_obc_fee,
            gov_scst_fee,
            gov_male_min_age,
            gov_male_max_age,
            gov_female_min_age,
            gov_female_max_age,
            gov_apply_link,
            gov_notification_link
        } = req.body;

        const image = req.file;

        // Authorize only the owner
        const authUser = await User.findById(id);
        if (!authUser) return res.status(400).json({ success: false, message: 'Author not found' });

        if (authUser.username !== process.env.owner_key) {
            return res.status(403).json({ success: false, message: 'Only owner can edit jobs' });
        }

        // Find existing job
        const existingJob = await Govjob.findById(govJobId);
        if (!existingJob) {
            return res.status(404).json({ success: false, message: "Gov job not found" });
        }

        let imageUrl = existingJob.gov_job_image;

        if (image) {
            // 1. Delete old image from Cloudinary if it exists
            if (existingJob.gov_job_image) {
                const publicId = existingJob.gov_job_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            // 2. Upload the new image
            const fileUri = getDatauri(image);
            const cloudResponse = await cloudinary.uploader.upload(fileUri);
            imageUrl = cloudResponse.secure_url;
        }

        // Update job
        const updatedJob = await Govjob.findByIdAndUpdate(
            govJobId,
            {
                gov_job_image: imageUrl,
                gov_job_post,
                auth_country,
                gov_job_appl_start,
                gov_job_last_start,
                gov_job_exam_date,
                gov_quick_view,
                gov_detailed_description,
                gov_general_fee,
                gov_female_fee,
                gov_obc_fee,
                gov_scst_fee,
                gov_male_min_age,
                gov_male_max_age,
                gov_female_min_age,
                gov_female_max_age,
                gov_apply_link,
                gov_notification_link
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Gov job updated successfully",
            updatedJob
        });

    } catch (error) {
        console.error("editGovJob error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
