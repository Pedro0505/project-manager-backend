import shell from 'shelljs';

const resetDB = async () => shell.exec('NODE_ENV=test prisma migrate reset --force --skip-seed --schema src/prisma/schema.test.prisma');

export { resetDB };
