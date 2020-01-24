// Importação do ROUTER do express, para a definição de rotas;
import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";

// Variável 'routes' para ser usada como definição de rotas;
const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.put("/users", authMiddleware, UserController.update);

// Exportação de Rotas
export default routes;
