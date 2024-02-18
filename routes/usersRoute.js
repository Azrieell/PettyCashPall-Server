import express from "express";
import {
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers
} from "../controllers/UsersControllers.js";

// import {
//   verifyUser,
//   adminOnly
// } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users/add', createUsers);
router.put('/users/edit/:id',updateUsers);
router.delete('/users/delete/:id',deleteUsers);

export default router