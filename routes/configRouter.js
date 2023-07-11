import { Router } from "express";
import { cargarConfig } from '../controllers/configController.js';
import { createAsesores, editAsesores, deleteAsesores, listarAsesores, listarAsesor } from '../controllers/asesoresController.js';
import { listarHorarios } from '../controllers/horariosController.js';
import { listarCelulares, editCelulares, deleteCelulares, createCelulares} from '../controllers/lineasController.js';
import { listarTemplates } from '../controllers/plantillasController.js';

const router = Router();

router.get('/', cargarConfig);


/** Usuarios */

router.get('/asesores', listarAsesores);
// router.get('/asesores/:idAsesor', listarAsesor);
router.post('/asesores', createAsesores);
router.put('/asesores', editAsesores);
router.delete('/asesores', deleteAsesores);


/** Lineas */

router.get('/lineas', listarCelulares);
// router.get('/lineas/:idHorario', listarLinea);
router.post('/lineas', createCelulares);
router.put('/lineas', editCelulares);
router.delete('/lineas', deleteCelulares);


/** Plantillas */


router.get('/template', listarTemplates);
// router.get('/horarios/:idHorario', listarAsesor);
// router.post('/horarios', createAsesores);
// router.put('/horarios', editAsesores);
// router.delete('/horarios', deleteAsesores);


/** Horarios */


router.get('/horarios', listarHorarios);
// router.get('/horarios/:idHorario', listarAsesor);
// router.post('/horarios', createAsesores);
// router.put('/horarios', editAsesores);
// router.delete('/horarios', deleteAsesores);


/** Tiempo chat */




export default router;