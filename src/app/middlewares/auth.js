import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

// Transforma uma função de callback em async e await

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ ERROR: 'Token não identificado' });
  }

  // Coloando a vírgula no array significa o discarte da primeira parte o array 'Bearer'
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Id do usuário de acordo com o Token
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ ERROR: 'Token inválido' });
  }
};
