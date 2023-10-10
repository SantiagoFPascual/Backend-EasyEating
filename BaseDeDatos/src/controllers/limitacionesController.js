import {Router} from 'express';
import LimitacionesService from '../services/limitaciones-services.js';
import {StatusCodes} from 'http-status-codes';

const router = Router();
const limitacionesService = new LimitacionesService();

router.get('', async (req, res) => {
  let respuesta;
  const limitaciones = await limitacionesService.getAll();
  if (limitaciones!=null){
    respuesta = res.status(StatusCodes.OK).json(limitaciones);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    console.log("GetById" + id);
    const limitacion = await limitacionesService.getById(id);
  
    if (limitacion!=null){
      respuesta = res.status(StatusCodes.OK).json(limitacion);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la limitacion (id:${id}).`);
    }
  
    return respuesta;
  });

  router.post('/', async (req, res) => {
    let limitacion = req.body;
  
    const registrosAfectados = await limitacionesService.insert(limitacion);
  
    return res.status(StatusCodes.CREATED).json(registrosAfectados);
  });

  router.put('/:id', async (req, res) => {
    let id    = req.params.id;
    let limitacion = req.body;
  
    const registrosAfectados = await limitacionesService.update(id, limitacion);
  
    return res.status(StatusCodes.OK).json(registrosAfectados);
  });

  router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
  
    const registrosAfectados = await limitacionesService.deleteById(id);
    if (registrosAfectados!=0){
      respuesta = res.status(StatusCodes.OK).json(respuesta);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la limitacion (id:${id}).`);
    }
    return respuesta;
  });
  
  export default router;

