import express from "express";
import 
{
  getExpenditureCategori,
  createExpenditureCategori,
  updateExpenditureCategori,
  deleteExpenditureCategori
} from '../controllers/ExpenditureCategoryController.js';

import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/category/expenditure' ,getExpenditureCategori, verifyUser);
router.post('/category/expenditure/add', createExpenditureCategori, verifyUser);
router.patch('/category/edit/:id', updateExpenditureCategori, verifyUser);
router.delete('/category/delete/:id', deleteExpenditureCategori, verifyUser);

export default router