import express from "express";
import {
  getArticles,
  getArticlesById,
  createArticles,
  updateArticles,
  deleteArticles
} from "../controllers/articlesControllers.js"

const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticlesById);
router.post('/articles', createArticles);
router.patch('/articles/:id', updateArticles);
router.delete('/articles/:id', deleteArticles);

export default router