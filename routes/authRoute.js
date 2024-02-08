import express from "express";
import {Login, Me} from "../controllers/authController.js";
import { verifyUser } from "../middleware/authUsers.js";
const router = express.Router();

router.get('/auth/me', verifyUser, Me);
router.post('/auth/login', Login);

export default router;