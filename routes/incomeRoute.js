import express from "express";
import {
  getIncomes,
  getIncomesById,
  createIncomes,
  updateIncomes,
  deleteIncomes
} from "../controllers/incomesControllers.js";

const router = express.Router();

router.get('/incomes', getIncomes);
router.get('/incomes/:id', getIncomesById);
router.post('/incomes', createIncomes);
router.patch('/incomes/:id', updateIncomes);
router.delete('/incomes/:id', deleteIncomes);

export default router