import shell from 'shelljs';
import { validate } from 'uuid'

const resetDB = async () => shell.exec('NODE_ENV=test prisma migrate reset --force --skip-seed --schema src/prisma/schema.test.prisma');

const verifyUuid = (uuid: string): boolean => validate(uuid);

export { resetDB, verifyUuid };
