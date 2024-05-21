import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes); //se configure que llame api/products api/carts

app.listen(8080, () => {
  console.log(" El servidor se encuentra escuchando en el puerto 8080");
});
 