import {Router} from 'express';
import RestauranteService from '../services/restaurantes-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router = Router();
const restauranteService = new RestauranteService();

router.get('', async (req, res) => {
  let respuesta;
  const restaurantes = await restauranteService.getAll();
  if (restaurantes!=null){
    respuesta = res.status(StatusCodes.OK).json(restaurantes);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/coords', async (req, res) => {
  let respuesta;
  const coords = await restauranteService.getCoordsAll();
  if (coords!=null){
    respuesta = res.status(StatusCodes.OK).json(coords);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/coords/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;
  console.log("GetById" + id);
  const coords = await restauranteService.getCoordsById(id);

  if (coords!=null){
    respuesta = res.status(StatusCodes.OK).json(coords);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el restaurante (id:${id}).`);
  }

  return respuesta;
});

router.get('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;
  console.log("GetById" + id);
  const restaurante = await restauranteService.getById(id);

  if (restaurante!=null){
    respuesta = res.status(StatusCodes.OK).json(restaurante);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el restaurante (id:${id}).`);
  }

  return respuesta;
});

router.post('/', async (req, res) => {
  let restaurante = req.body;

  const registrosAfectados = await restauranteService.insert(restaurante);

  return res.status(StatusCodes.CREATED).json(registrosAfectados);
});

router.put('/:id', async (req, res) => {
  let id    = req.params.id;
  let restaurante = req.body;

  const registrosAfectados = await restauranteService.update(id, restaurante);

  return res.status(StatusCodes.OK).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const registrosAfectados = await restauranteService.deleteById(id);
  if (registrosAfectados!=0){
    respuesta = res.status(StatusCodes.OK).json(respuesta);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el restaurante (id:${id}).`);
  }
  return respuesta;
});

export default router;