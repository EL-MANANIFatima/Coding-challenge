import { PrismaClient } from '@prisma/client';

declare let global: NodeJS.Global & typeof globalThis;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}
/*
This snippet of code is here to avoid creating a new instance of PrismaClient everytime we need to 
connect to the database
*/
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
