import express from "express";
import 
{getCategori,
createCategori,
updateCategori,
deleteCategori
} from '../controllers/CategoriControllers.js';

import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/categori' ,getCategori);
router.post('/categori/add', createCategori);
router.patch('/categori/edit/:id', updateCategori);
router.delete('/categori/delete/:id', deleteCategori);

export default router