import express from "express";
import { addMemberToGroup, bringChats, changeGroupName, createChat, createGroupChats, removeMemberFromGroup } from "../controllers/chat.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route('/').post(isAuthenticated, createChat);
router.route('/').get(isAuthenticated, bringChats);
router.route('/group').post(isAuthenticated, createGroupChats);
router.route('/rename').put(isAuthenticated, changeGroupName);
router.route('/groupadd').put(isAuthenticated, addMemberToGroup);
router.route('/groupremove').put(isAuthenticated, removeMemberFromGroup);

export default router; 