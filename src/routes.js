// Importação do ROUTER do express, para a definição de rotas;
import { Router } from "express";

// Variável 'routes' para ser usada como definição de rotas;
const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

/*
    Exportação de Rotas;
*/
export default routes;
