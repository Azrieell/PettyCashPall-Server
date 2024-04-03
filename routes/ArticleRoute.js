import express from "express";
import {
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from "../controllers/articlesControllers.js"
import {verifyUser, adminOnly} from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/articles',verifyUser,adminOnly, getArticle);
router.post('/articles',verifyUser,adminOnly, createArticle);
router.patch('/articles/:id',verifyUser,adminOnly, updateArticle);
router.delete('/articles/:id',verifyUser,adminOnly, deleteArticle);

export default router