/*
    Estrutura da aplicação;
*/
import express from 'express';
import path from 'path';
import routes from './routes';
import './database/index';

/*
    Definição da classe do app;
*/
class App {
  // Executado automaticamente quando a classe 'App' é chamada;
  constructor() {
    this.server = express(); // variável de declaração de rotas.
    this.middlewares();
    this.routes();
  }

  /*
      Permite enviar e receber requisições do tipo JSON;
  */
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes); // Rotas importadas do routes.js.
  }
}

/*
    Exportação do App direto para o server;
*/

export default new App().server;
