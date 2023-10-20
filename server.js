import 'dotenv/config'
import express from "express";
import cors from "cors";
import RestauranteRouter from "./BaseDeDatos/src/controllers/restauranteController.js";
import LimitacionesRouter from "./BaseDeDatos/src/controllers/limitacionesController.js";
import UsuarioRouter from "./BaseDeDatos/src/controllers/usuariosController.js";
import ProductoRouter from "./BaseDeDatos/src/controllers/productoController.js";
import LimitacionXProductoRouter from "./BaseDeDatos/src/controllers/limitacionesXProductoController.js";

const app  = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/front', express.static('./BaseDeDatos/public'));

//endpoint de los routers

app.use("https://backendeasyeating.onrender.com/api/restaurantes", RestauranteRouter);
app.use("https://backendeasyeating.onrender.com/api/limitaciones", LimitacionesRouter);
app.use("https://backendeasyeating.onrender.com/api/usuarios", UsuarioRouter);
app.use("https://backendeasyeating.onrender.com/api/productos", ProductoRouter);
app.use("https://backendeasyeating.onrender.com/api/limitacionxproducto", LimitacionXProductoRouter);

app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/front)`);
});