import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyForJob, createJob, deleteJob, getAllCloseJobs, getAllCurentUsersCreatedJobs, getAllLiveJobs, getAllPendingJobs, getApplicationByUsers, getJobApplicants, getJobById, updateApplicationStatus, updateJob, updateStatusOfJob, withdrawApplication } from "../controllers/jobcontrollers/job.controller.js";

const router = express.Router();

// job route

router.route('/create').post(isAuthenticated, createJob);

// all jobs route
router.route('/get-all-closed-jobs').get(getAllCloseJobs)
router.route('/get-all-pending-jobs').get(getAllPendingJobs)
router.route('/get-all-live-jobs').get(getAllLiveJobs)

router.route('/get-all-applied-jobs').get(isAuthenticated, getApplicationByUsers);
// find job by id
router.route('/my-created-job').get(isAuthenticated, getAllCurentUsersCreatedJobs)
router.route('/:id').get( isAuthenticated, getJobById);
router.route('/update/:id').put(isAuthenticated, updateJob);
router.route('/delete/:id').delete(isAuthenticated, deleteJob);



// admin route
router.route('/update-job-pendinglive-status/:id').put(isAuthenticated, updateStatusOfJob);

// apply management

// --> apply for job
router.route('/apply/:jobId').put(isAuthenticated, applyForJob);
// router.route('/my-applications').get(isAuthenticated, getUserApplications);
router.route('/update-applicants-status/:jobId/:userId').put(isAuthenticated, updateApplicationStatus);
router.route('/get-job-applicants/:jobId').get(isAuthenticated, getJobApplicants);
router.route('/withdraw-application/:jobId').put(isAuthenticated, withdrawApplication);


export default router;

