import 'dotenv/config'
import express from "express";
import cors from "cors";
import RestauranteRouter from "./BaseDeDatos/src/controllers/restauranteController.js";
import LimitacionesRouter from "./BaseDeDatos/src/controllers/limitacionesController.js";
import UsuariosRouter from "./BaseDeDatos/src/controllers/usuariosController.js";

const app  = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/front', express.static('./BaseDeDatos/public'));

//endpoint de los routers

app.use("/api/restaurantes", RestauranteRouter);
app.use("/api/limitaciones", LimitacionesRouter);
app.use("/api/usuarios", UsuariosRouter);

app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/)`);
});