import {Router} from 'express';
import LimitacionesXRestauranteService from '../services/limitacionesXRestaurante-services.js';
import {StatusCodes} from 'http-status-codes';

const router = Router();
const limitacionesXRestauranteService = new LimitacionesXRestauranteService();

router.get('', async (req, res) => {
let respuesta;
console.log("llega")
const limitaciones = await limitacionesXRestauranteService.getAll();
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
    const limitacion = await limitacionesXRestauranteService.getById(id);

    if (limitacion!=null){
    respuesta = res.status(StatusCodes.OK).json(limitacion);
    } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la limitacion (id:${id}).`);
    }

    return respuesta;
});

router.post('/', async (req, res) => {
    let limitacionXRestaurante = req.body;

    const registrosAfectados = await limitacionesXRestauranteService.insert(limitacionXRestaurante);

    return res.status(StatusCodes.CREATED).json(registrosAfectados);
});

router.put('/:id', async (req, res) => {
    let id    = req.params.id;
    let limitacionXRestaurante = req.body;

    const registrosAfectados = await limitacionesXRestauranteService.update(id, limitacionXRestaurante);

    return res.status(StatusCodes.OK).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;

    const registrosAfectados = await limitacionesXRestauranteService.deleteById(id);
    if (registrosAfectados!=0){
    respuesta = res.status(StatusCodes.OK).json(respuesta);
    } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la limitación del Restaurante (id:${id}).`);
    }
    return respuesta;
});

export default router;

