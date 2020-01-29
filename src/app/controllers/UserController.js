/**
 * Criação de usuário e controle de conta
 */
import * as Yup from 'yup'; // Validação de User
import User from '../models/User';

// Cadastro de um novo usuário, recebe os dados e cria um novo registro na base de dados
class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERROR: 'Falha na validação' });
    }

    // Verificação de existencia de email cadastrado
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ ERROR: 'Usuário já existe.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  /**
   * Atualização de dados do usuário / Atualização de senha com checagem
   * da senha antiga
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        /**
         * Se o campo de oldPassword for preenchido para a alteração de senha
         * o preenchimento da nova senha é orbigatório
         */
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      /**
       * Se o campo de troca de senha for preenchido com a nova senha
       * uma confirmação de troca de senha precisa ser preenchido
       */
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERROR: 'Falha na validação' });
    }

    const { email, oldPassword } = req.body;

    // Busca de usuário por ID (findByPk) e verificação de email
    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ ERROR: 'Usuário já existe.' });
      }
    }

    // Checagem e conferimento da senha antiga para a senha para troca de senhas
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ ERROR: 'A senha não confere' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
