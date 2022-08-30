import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ErrorHandlerMiddleware
    implements IMiddleware<Context, NextFunction>
{
    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            try {
                ctx.logger.info(ctx.request);
                await next();
                ctx.logger.info(ctx.response);
            } catch (error) {
                ctx.logger.error(error);
                // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
                ctx.app.emit('error', error, ctx);
                const status = error.status || 500;
                // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
                const message =
                    status === 500 && ctx.app.env === 'prod'
                        ? 'Internal Server Error'
                        : error.message;
                // 从 error 对象上读出各个属性，设置到响应中

                //TODO 在service中，throw出一个对象，将对象加到响应中
                const { code, messageVisible, data } = error;
                ctx.body = {
                    code: code ? code : 1,
                    messageVisible: messageVisible
                        ? messageVisible
                        : message
                        ? true
                        : false,
                    message: message ? message : 'throw异常,但未throw错误信息',
                    data: data,
                };
                if (status === 422) {
                    // ctx.body.detail = error.errors;
                }
                ctx.status = status;
            }
        };
    }
}
