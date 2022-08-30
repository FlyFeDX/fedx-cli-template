import { App, Configuration, Inject } from '@midwayjs/decorator';
import {
    ILifeCycle,
    IMidwayContainer,
    IMidwayApplication,
} from '@midwayjs/core';
import * as axios from '@midwayjs/axios';
import { Application } from '@midwayjs/koa';
import { join } from 'path';
import { getConnection } from 'typeorm';
// import { glob } from 'glob';
// import watch from 'node-watch';
import { myBatis } from '@oss-bff/core';
import * as ossBffCore from '@oss-bff/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as cors from '@koa/cors';
import * as cache from '@midwayjs/cache';
import { ErrorHandlerMiddleware } from './middleware/ErrorHandler';
import * as task from '@midwayjs/task'; // 导入模块

@Configuration({
    importConfigs: [join(__dirname, './config')],
    conflictCheck: true,
    imports: [
        koa,
        validate,
        {
            component: info,
            enabledEnvironment: ['local'],
        },
        axios,
        ossBffCore,
        cache,
        task,
    ],
})
export class ContainerLifeCycle implements ILifeCycle {
    @App()
    app: Application;

    @Inject()
    myBatisService: myBatis;

    async onReady(container: IMidwayContainer, app: IMidwayApplication) {
        this.app.use(
            cors({
                origin: '*',
            })
        );
        this.app.useMiddleware([ErrorHandlerMiddleware]);

        const connection = getConnection();
        console.log(`[ TypeORM ] connection [${connection.name}] established`);
        // watch(
        //     app.getBaseDir() + '/public/mappers/',
        //     { recursive: true },
        //     (evt, name) => {
        //         this.myBatisService.createMapper([name]);
        //     }
        // );
        // const xmlPaths = glob.sync(join(__dirname, '/public/mappers/**/*.xml'));
        // this.myBatisService.createMapper(xmlPaths);
        // console.log(container, app);
    }
}
