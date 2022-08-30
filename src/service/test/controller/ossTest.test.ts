import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';

describe('test/controller/ossTest.test.ts', () => {
    let app: Application;

    beforeAll(async () => {
        // create app
        app = await createApp<Framework>();
    });

    afterAll(async () => {
        await close(app);
    });

    it('should GET /', async () => {
        // make request
        const result = await createHttpRequest(app).get('/ossTest');

        // use expect by jest
        expect(result.status).toBe(200);
    });
});
