/**
 * Configuração de upload
 * de arquivos/img
 */
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // Caminhos de img
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    // Formatação de arquivos de img/nome
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // Configuracao do nome do arquivo para nome padrao
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
