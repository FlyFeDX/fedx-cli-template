import { MidwayConfig } from '@midwayjs/core';

export default {
    orm: {
        default: {
            type: 'oracle',
            host: '10.10.5.94',
            port: 1521,
            username: 'ovddb',
            password: 'root123',
            sid: 'oracle',
            synchronize: false,
            logging: true,
        },
    },

    // orm: {
    //     default: {
    //         type: 'mysql',
    //         host: '10.12.2.104',
    //         port: 3306,
    //         username: 'root',
    //         password: 'root123',
    //         database: 'ovddb',
    //         synchronize: false,
    //         logging: true,
    //     },
    // },
} as MidwayConfig;
