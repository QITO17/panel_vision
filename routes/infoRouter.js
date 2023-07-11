import { Router } from "express";
import { listarTabla } from '../controllers/infoController.js';

const router = Router();

router.get('/', listarTabla);


export default router;