import express from "express";
import { addRating, editProfile, getAllFreelancers, getProfile, login, logout, signup } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/freelancer/:username').get(getProfile)
router.route('/freelancers').get(getAllFreelancers)
router.route('/editProfile').put(isAuthenticated, upload.single('profile-image'), editProfile)
router.route('/rate').post(isAuthenticated, addRating)

export default router;