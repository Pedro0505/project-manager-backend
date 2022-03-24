import request from 'supertest';
import app from '../../src/app';

// ISSO É ARTE
interface IAssertion<U> {
  title: string;
  bodyOverlaod?: U;
  errorMessage: string;
}

interface IInvalidBody<T, U> {
  field: keyof T;
  baseBody: object;
  assertions: IAssertion<U>[];
  endpoint: string;
  verb: 'get' | 'post' | 'delete' | 'put';
}

export const invalidBody = <T, U>(data: IInvalidBody<T, U>) => {
  data.assertions.forEach((assertion) => {
    it(`"${data.field}" ${assertion.title}`, async () => {
      const { status, body } = await request(app)
        [data.verb](data.endpoint)
        .send({ ...data.baseBody, [data.field]: assertion.bodyOverlaod });

      expect(status).toBe(400);
      expect(body.error).toBeDefined();
      expect(body.error.message).toMatch(`"${data.field}" ${assertion.errorMessage}`);
    });
  });
};
