
import { Job } from "../../models/job.model.js";
import { User } from "../../models/user.model.js";

export const createJob = async (req, res) => {
    try {
        const {
            company_name,
            job_position,
            about,
            experience,
            date,
            vacancy,
            compensation,
            job_type,
            job_description
        } = req.body;

        // Validate required fields
        if (!company_name || !job_position || !date || !job_description || !vacancy) {
            return res.status(400).json({
                error: "Required fields: company name, job position, last date, vacancy, and job description"
            });
        }

        const newJob = new Job({
            company_name,
            post_name: job_position, // renamed
            experience_level: experience,
            last_date: date,
            vacancy,
            compensation,
            job_type,
            job_about: about,
            job_description,
            created_by: req.id,
            job_status: 'pending'
        });

        await newJob.save();

        return res.status(201).json({
            success: true,
            message: 'Job has been created',
            newJob
        });

    } catch (error) {
        console.error("Job creation error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllCurentUsersCreatedJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ created_by: req.id })
            .sort({ createdAt: -1 })
            .populate('created_by', 'name email');

        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
export const getAllLiveJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ job_status: 'live' })
            .sort({ createdAt: -1 })
            .populate('created_by', 'person_name username profilePicture');

        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllCloseJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ job_status: 'closed' })
            .sort({ createdAt: -1 })
            .populate('created_by', 'name email');

        return res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPendingJobs = async (req, res) => {
    try {

        // const currentUser = await User.findById(req.id);
        // if(currentUser.username !== 'manjitsingh' || currentUser.phnumber !== '8750881558'){
        //     return res.status({success: false, message: 'Only owner can access'})
        // }

        const jobs = await Job.find({ job_status: 'pending' })
            .sort({ createdAt: -1 })
            .populate('created_by', 'name email');

        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('created_by', 'name email')
            .populate('applicants.user', 'name email');

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        return res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateJob = async (req, res) => {
    try {

        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, created_by: req.id },
            req.body,
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        return res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatusOfJob = async (req, res) => {
    try {
        const { job_status } = req.body;
        const jobId = req.params.id;
        const ownerId = req.id;

        const websiteOwner = await User.findById(ownerId);

        // websiteOwner.username !== 'manjitsingh' not for production health/use use process.env.OwnerUsername/phNumber

        if(websiteOwner.username !== 'manjitsingh' || websiteOwner.phnumber !== '8750881558'){
            return res.status(404).json({
                success: false,
                message: `Only owner can access this feature`
            })
        }

        const foundedJob = await Job.findById(jobId);
        if (!foundedJob) {
            return res.status(400).json({ success: false, message: 'Job not found' });
        }

        const validStatuses = ['pending', 'live', 'closed'];
        if (!validStatuses.includes(job_status)) {
            return res.status(400).json({ error: 'Invalid job status' });
        }


        const job = await Job.findByIdAndUpdate(
            jobId,
            { job_status },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            success: true,
            message: 'Job status updated successfully',
            job
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            created_by: req.id
        });

        if (!job) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// apply management

export const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Check if already applied
        const alreadyApplied = job.applicants.some(
            applicant => applicant.user.equals(req.id)
        );

        if (alreadyApplied) {
            return res.status(400).json({ error: "You have already applied for this job" });
        }

        job.applicants.push({
            user: req.id,
            status: 'applied',
            employerAction: 'pending'
        });

        await job.save();
        return res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserApplications = async (req, res) => {
    try {
        const jobs = await Job.find({ "applicants.user": req.id })
            .populate('created_by', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['in_touch', 'hired', 'rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const job = await Job.findOne({
            _id: req.params.jobId,
            created_by: req.id
        });

        if (!job) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        const applicantIndex = job.applicants.findIndex(
            applicant => applicant.user.equals(req.params.userId)
        );

        if (applicantIndex === -1) {
            return res.status(404).json({ error: "Applicant not found" });
        }

        // Update status
        job.applicants[applicantIndex].status = status;

        // If final status, update employerAction too
        if (['hired', 'rejected'].includes(status)) {
            job.applicants[applicantIndex].employerAction = status;
        }

        job.applicants[applicantIndex].lastUpdated = Date.now();
        await job.save();

        return res.status(200).json({ message: "Application status updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getJobApplicants = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.jobId,
            created_by: req.id
        }).populate('applicants.user', 'name email resume');

        if (!job) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        return res.status(200).json(job.applicants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const withdrawApplication = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        const applicantIndex = job.applicants.findIndex(
            applicant => applicant.user.equals(req.id)
        );

        if (applicantIndex === -1) {
            return res.status(404).json({ error: "You haven't applied for this job" });
        }

        // Remove the application
        job.applicants.splice(applicantIndex, 1);
        await job.save();

        return res.status(200).json({ message: "Application withdrawn successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

