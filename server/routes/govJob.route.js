import express from 'express';
import { createGovJob, deleteGovJob, editGovJob, getAllGovJob } from '../controllers/jobcontrollers/govJob.contorller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route('/create').post(isAuthenticated, upload.single('image'), createGovJob);
router.route('/readallgovjobs').get(getAllGovJob);
router.route('/delete/:govJobId').delete(isAuthenticated, deleteGovJob);
router.route('/edit/:govJobId').delete(isAuthenticated, upload.single('image') , editGovJob);

export default router;