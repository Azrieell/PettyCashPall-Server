import express from "express";
import {
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers
} from "../controllers/usersControllers.js"

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users/add', createUsers);
router.patch('/users/edit/:id', updateUsers);
router.delete('/users/delete/:id', deleteUsers);

export default router