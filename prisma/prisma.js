// prisma.js
import { PrismaClient } from './generated/client/index.js'
if (typeof atob === 'undefined') {
    global.atob = function (str) {
      return Buffer.from(str, 'base64').toString('binary');
    };
  }
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
