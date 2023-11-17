import {Router} from 'express';
import LimitacionesXProductoService from '../services/limitacionesXProducto-services.js';
import {StatusCodes} from 'http-status-codes';

const router = Router();
const limitacionesXProductoService = new LimitacionesXProductoService();

router.get('', async (req, res) => {
  let respuesta;
  console.log("llega")
  const limitaciones = await limitacionesXProductoService.getAll();
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
    const limitacion = await limitacionesXProductoService.getByIdProducto(id);
  
    if (limitacion!=null){
      respuesta = res.status(StatusCodes.OK).json(limitacion);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la limitacion (id:${id}).`);
    }
  
    return respuesta;
  });

  router.post('/', async (req, res) => {
    let limitacionXProducto = req.body;
  
    const registrosAfectados = await limitacionesXProductoService.insert(limitacionXProducto);
  
    return res.status(StatusCodes.CREATED).json(registrosAfectados);
  });

  router.put('/:id', async (req, res) => {
    let id    = req.params.id;
    let limitacionXProducto = req.body;
  
    const registrosAfectados = await limitacionesXProductoService.update(id, limitacionXProducto);
  
    return res.status(StatusCodes.OK).json(registrosAfectados);
  });

  router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
  
    const registrosAfectados = await limitacionesXProductoService.deleteById(id);
    if (registrosAfectados!=0){
      respuesta = res.status(StatusCodes.OK).json(respuesta);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la limitación del producto (id:${id}).`);
    }
    return respuesta;
  });
  
  export default router;

