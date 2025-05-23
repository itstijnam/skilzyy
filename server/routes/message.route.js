import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addReaction, callAllMessages, deleteMessage, editMessage, markAsRead, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.route('/').post(isAuthenticated, sendMessage);
router.route('/:chatId').get(isAuthenticated, callAllMessages);  
router.route('/add-reaction').put(isAuthenticated, addReaction);  
router.route('/add-reaction').put(isAuthenticated, addReaction);  
router.route('/mark-read').put(isAuthenticated, markAsRead);  
router.route('/editMessage').put(isAuthenticated, editMessage);  
router.route('/delete-message').put(isAuthenticated, deleteMessage);  

export default router;
