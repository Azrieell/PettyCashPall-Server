import express from "express";
import {
  getAllIncomes,
  getIncomesByUserId,
  createIncome,
  updateIncome,
  deleteIncome
} from "../controllers/incomesControllers.js";

const router = express.Router();

router.get('/incomes' ,getAllIncomes);
router.get('/incomes/:id',  getIncomesByUserId);
router.post('/incomes/add', createIncome);
router.patch('/incomes/edit/:id', updateIncome);
router.delete('/incomes/delete/:id', deleteIncome);

export default router