import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const ENV = process.env.NODE_ENV || 'dev';

const DB_URLS = {
  dev: process.env.DATABASE_URL_DEV,
  test: process.env.DATABASE_URL_TEST,
  prod: process.env.DATABASE_URL,
};

const url = DB_URLS[ENV as keyof typeof DB_URLS];

const prisma = new PrismaClient({ datasources: { db: { url } } });

export default prisma;
