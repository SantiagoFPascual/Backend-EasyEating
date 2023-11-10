import {Router} from 'express';
import UsuariosService from '../services/usuarios-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';


const router = Router();
const usuariosService = new UsuariosService();

  router.get('', async (req, res) => {
    let respuesta;
    const usuarios = await usuariosService.getAll();
    if (usuarios!=null){
      respuesta = res.status(StatusCodes.OK).json(usuarios);
    } else {
      respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
    }

    return respuesta;
  });

  router.get('/:id', async (req, res) => {
      let respuesta;
      let id = req.params.id;
      console.log("GetById" + id);
      const usuario = await usuariosService.getById(id);
    
      if (usuario!=null){
        respuesta = res.status(StatusCodes.OK).json(usuario);
      } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro al usuario (id:${id}).`);
      }
    
      return respuesta;
    });

  router.post('/', async (req, res) => {
    let usuario = req.body;
  
    const registrosAfectados = await usuariosService.insert(usuario);
  
    return res.status(StatusCodes.CREATED).json(registrosAfectados);
  });

  router.put('/:id', async (req, res) => {
    let id    = req.params.id;
    let usuario = req.body;
  
    const registrosAfectados = await usuariosService.update(id, usuario);
  
    return res.status(StatusCodes.OK).json(registrosAfectados);
  });
  
  router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
  
    const registrosAfectados = await usuariosService.deleteById(id);
    if (registrosAfectados!=0){
      respuesta = res.status(StatusCodes.OK).json(respuesta);
    } else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro al usuario (id:${id}).`);
    }
    return respuesta;
  });

  router.post('/login', async (req, res) =>{
    try{
        let usuario = req.body;
        let usuarioActualizado = await usuariosService.login(usuario);
        console.log("USUARIO:")
        console.log(usuarioActualizado)
        if(usuarioActualizado != null){
            res.status(200).send(usuarioActualizado);
        }else{
            res.status(404).send('No fue posible realizar el login');   
        }
    }catch(e){
        console.log(e);        
    }
})


export default router;