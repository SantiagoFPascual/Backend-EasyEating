import {Router} from 'express';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';
import LimitacionesXProductoService from '../services/limitacionesXProducto-services.js';
import ProductoService from '../services/producto-services.js';

const router = Router();
const productoService = new ProductoService();
const limitacionesXProductoService = new LimitacionesXProductoService();
//const nutritionalInfo = new NutritionalInfo();

router.get('', async (req, res) => {
    let respuesta;
    const productos = await productoService.getAll();
    if (productos!=null){
        respuesta = res.status(StatusCodes.OK).json(productos);
    } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
    }

    return respuesta;
});

router.get('/:barCode', async (req, res) => {
    let respuesta;
    let barCode = req.params.barCode;


    console.log("GetById " + barCode);
    var producto = await productoService.getById(barCode);

    if (producto!=null){
        respuesta = res.status(StatusCodes.OK).json(producto);
    } else {
        console.log("No se encontró el producto en nuestra base de datos")
        console.log("BARCODE: " + barCode)

        const info = await productoService.getNutritionalInfo(barCode);
        
        if(info != null){
            console.log("Existe el producto")
            producto = await productoService.getById(barCode);
            var celiaquia = await limitacionesXProductoService.insertCeliaquia(producto.idProducto, producto.barCode);
            var diabetes = await limitacionesXProductoService.insertDiabetes(producto.idProducto, producto.barCode);
            var intLactosa = await limitacionesXProductoService.insertIntLactosa(producto.idProducto, producto.barCode);
            
            respuesta = res.status(StatusCodes.OK).json(producto);
        }else{
            respuesta = res.status(StatusCodes.BAD_REQUEST).send(`Error en el BarCode`)
        }
        
        //respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el producto en la base de datos(barCode: ${barCode}). Ahora se ingreserá el producto en la base de datos.`);
    }

    return respuesta;  0
});


router.post('/', async (req, res) => {
    let producto = req.body;

    const registrosAfectados = await productoService.insert(producto);

    return res.status(StatusCodes.CREATED).json(registrosAfectados);
});

/*
router.post('/:barCode', async (req, res) => {
    let respuesta;
    let barCode = req.params.barCode;

    console.log("GetById " + barCode);

    const producto = await productoService.getById(barCode);

    if (producto != null) {
        respuesta = res.status(StatusCodes.OK).json(producto);
    } else {
        console.log("BARCODE: " + barCode)

        const info = await nutritionalInfo.getNutritionalInfo(barCode);
        console.log("ACA: " + info.nombre)

        // Asumiendo que `info` contiene los datos del producto para insertar
        const registrosAfectados = await productoService.insert(info);

        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el producto en la base de datos(barCode: ${barCode}). Ahora se ingresará el producto en la base de datos.`);
    }

    return respuesta;
});
*/

router.put('/:id', async (req, res) => {
    let id    = req.params.id;
    let producto = req.body;

    const registrosAfectados = await productoService.update(id, producto);

    return res.status(StatusCodes.OK).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;

    const registrosAfectados = await productoService.deleteById(id);
    if (registrosAfectados!=0){
        respuesta = res.status(StatusCodes.OK).json(respuesta);
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el producto (id:${id}).`);
    }
    return respuesta;
});

export default router;