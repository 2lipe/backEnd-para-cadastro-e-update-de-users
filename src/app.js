/**
 *  Estrutura da aplicação;
 */
import express from 'express';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import path from 'path';
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';
import './database/index';

class App {
  // Executado automaticamente quando a classe 'App' é chamada;
  constructor() {
    this.server = express(); // variável de declaração de rotas.

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  /*
      Permite enviar e receber requisições do tipo JSON
  */
  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes); // Rotas importadas do routes.js.
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

// Exportação do App para o server
export default new App().server;
