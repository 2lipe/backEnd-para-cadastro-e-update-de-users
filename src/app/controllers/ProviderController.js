/**
 * Controle de indentificação
 * de prestadores de servico/provider
 */
import User from '../models/User';
import File from '../models/File';

class ProviderController {
  /**
   * Busca um provider no banco de dados
   * com as características referenciadas
   */
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
