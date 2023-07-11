import Router from "express";
import { cargarPanel, cargarMensajes, listarLineas, changeChat } from "../controllers/panelController.js";

const router = Router();

router.get("/",cargarPanel);

router.get('/mensajes/:idChat',cargarMensajes)

router.get('/lineas/:ruta',listarLineas)

router.get('/getChats/:idLinea',changeChat)



export default router;


