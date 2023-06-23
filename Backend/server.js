import 'dotenv/config'
import express from "express";
import cors from "cors";
import RestauranteRouter from "./src/controllers/restauranteController.js";


const app  = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/front', express.static('public'));

//endpoint de los routers

app.use("/api/restaurantes", RestauranteRouter);

app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/)`);
});