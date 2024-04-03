import express from "express";
import 
{
  getIncomesCategori,
  createIncomesCategori,
  updateIncomesCategori,
  deleteIncomesCategori
} from '../controllers/IncomesCategoryControllers.js';

import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/category/incomes' ,getIncomesCategori, verifyUser);
router.post('/category/incomes/add', createIncomesCategori, verifyUser);
router.patch('/category/edit/:id', updateIncomesCategori, verifyUser);
router.delete('/category/delete/:id', deleteIncomesCategori, verifyUser);

export default router