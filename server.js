import 'dotenv/config'
import express from "express";
import cors from "cors";
import RestauranteRouter from "./BaseDeDatos/src/controllers/restauranteController.js";
import LimitacionesRouter from "./BaseDeDatos/src/controllers/limitacionesController.js";
import UsuarioRouter from "./BaseDeDatos/src/controllers/usuariosController.js";
import ProductoRouter from "./BaseDeDatos/src/controllers/productoController.js";
import LimitacionXProductoRouter from "./BaseDeDatos/src/controllers/limitacionesXProductoController.js";
import LimitacionXRestauranteRouter from "./BaseDeDatos/src/controllers/limitacionesXRestauranteController.js";

const app  = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/front', express.static('./BaseDeDatos/public'));

//endpoint de los routers

app.use("/api/restaurantes", RestauranteRouter);
app.use("/api/limitaciones", LimitacionesRouter);
app.use("/api/usuarios", UsuarioRouter);
app.use("/api/productos", ProductoRouter);
app.use("/api/limitacionxproducto", LimitacionXProductoRouter);
app.use("/api/limitacionxrestaurante", LimitacionXRestauranteRouter);

/*app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/front)`);
});*/