export default {
    keys: '_1636105761383_7358',

    koa: {
        port: 7777,
    },

    // add your config here
    middleware: ['errorHandlerMiddleware'],

    midwayFeature: {
        // true 代表使用 midway logger
        // false 或者为空代表使用 egg-logger
        replaceEggLogger: true,
    },

    // orm: {
    //     default: {
    //         type: 'oracle',
    //         host: '10.10.5.94',
    //         port: 1521,
    //         username: 'ovddb',
    //         password: 'root123',
    //         sid: 'oracle',
    //         synchronize: false,
    //         logging: true,
    //     },
    // },
    orm: {
        default: {
            url: `mysql://root:root123@10.12.2.104:3306/ovddb`,
            type: 'mysql',
            host: '10.12.2.104',
            port: 3306,
            username: 'root',
            password: 'root123',
            database: 'ovddb',
            synchronize: false,
            logging: true,
        },
    },

    cache: {
        store: 'memory',
        options: {
            max: 1000,
            ttl: null,
        },
    },
};
