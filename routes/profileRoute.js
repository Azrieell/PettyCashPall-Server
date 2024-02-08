import express from 'express';
import {
  getAllProfileUsers,
  getProfileUsersByUuid,
  createProfileAndUser,
  updateProfileUser,
  deleteProfileImage
} from '../controllers/profileController.js';
import { verifyUser } from '../middleware/authUsers.js';

const router = express.Router();

router.get('/profiles', getAllProfileUsers);
router.get('/profile/:uuid', getProfileUsersByUuid);
router.post('/profile/users/create', createProfileAndUser);
router.patch('/profile/update', verifyUser, updateProfileUser);
router.delete("/profile/image/delete", verifyUser, deleteProfileImage);

export default router;