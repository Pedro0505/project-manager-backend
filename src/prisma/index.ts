import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const ENV = process.env.NODE_ENV || 'development';
const DB_URLS = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_URL_TEST,
};
const url = DB_URLS[ENV as keyof typeof DB_URLS];

const prisma = new PrismaClient({ datasources: { db: { url } }, log: ['query', 'info', 'warn', 'error'] });

export default prisma;
