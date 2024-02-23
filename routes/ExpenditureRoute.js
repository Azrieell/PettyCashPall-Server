import express from "express";
import {
getAllExpenditure,
getExpenditureByUserId,
createExpenditure,
updateExpenditure,
deleteExpenditure
} from "../controllers/ExpenditureControllers.js";

import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/expenditure',verifyUser, getAllExpenditure);
router.get('/expenditure/:id',verifyUser, getExpenditureByUserId);
router.post('/expenditure/add',verifyUser, createExpenditure);
router.patch('/expenditure/edit/:id',verifyUser, updateExpenditure);
router.delete('/expenditure/delete/:id',verifyUser, deleteExpenditure);

export default router