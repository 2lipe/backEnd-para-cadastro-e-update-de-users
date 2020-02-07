/**
 * Separa o processamento da fila do restante da aplicação
 * não influenciando em performance
 */
import 'dotenv/config';

import Queue from './lib/Queue';

Queue.processQueue();
