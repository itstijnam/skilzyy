import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addNewGig, deleteGig, getAllGig } from "../controllers/gig.controller.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, upload.single('image'), addNewGig);
router.route('/getallgigs').get(getAllGig)
router.route('/delete/:id').delete(isAuthenticated, deleteGig);

export default router;