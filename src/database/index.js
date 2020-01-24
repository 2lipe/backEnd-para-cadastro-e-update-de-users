/**
 * Conexão com o banco de dados e carregamento de models
 */
import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  //Faz a conexão com a base de dados e carrega dos models
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
