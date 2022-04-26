import { validate } from 'uuid'

const verifyUuid = (uuid: string): boolean => validate(uuid);

export { verifyUuid };
