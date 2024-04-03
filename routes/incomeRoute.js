import express from "express";
import {
  getAllIncomes,
  getIncomesByUserId,
  createIncome,
  updateIncome,
  deleteIncome
} from "../controllers/IncomesControllers.js";

import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/incomes',verifyUser, getAllIncomes);
router.get('/incomes/user/:id',verifyUser, getIncomesByUserId);
router.post('/incomes/add',verifyUser, createIncome);
router.patch('/incomes/edit/:id',verifyUser, updateIncome);
router.delete('/incomes/delete/:id',verifyUser, deleteIncome);

export default router