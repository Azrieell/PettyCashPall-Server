import express from "express";
import {
  getArticles,
  getArticlesById,
  createArticles,
  updateArticles,
  deleteArticles
} from "../controllers/ArticlesControllers.js"
import {verifyUser, adminOnly} from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/articles',verifyUser,adminOnly, getArticles);
router.get('/articles/:id',verifyUser,adminOnly, getArticlesById);
router.post('/articles',verifyUser,adminOnly, createArticles);
router.patch('/articles/:id',verifyUser,adminOnly, updateArticles);
router.delete('/articles/:id',verifyUser,adminOnly, deleteArticles);

export default router