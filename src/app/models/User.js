import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/**
 * Permite criar, editar e deletar usuários
 */
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        /**
         * Colunas da base de dados, enseridas para cadastramento de novos usuários
         */
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // Segundo parâmetro da super.init()
      }
    );

    // trexos de código executados automaticamente
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Adiciona a coluna avatar a tabela de usuários
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // Verificação de senha
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
