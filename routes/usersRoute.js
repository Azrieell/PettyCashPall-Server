import express from "express";
import {
  getUsers,
  getUsersById,
  createAdmin,
  updateUsers,
  deleteUsers
} from "../controllers/usersControllers.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js"


const router = express.Router();

router.get('/users', verifyUser, getUsers);
router.get('/users/:id', getUsersById);
router.post('/admin/add', createAdmin);
router.put('/users/edit/:id',updateUsers);
router.delete('/users/delete/:id',deleteUsers);

export default router