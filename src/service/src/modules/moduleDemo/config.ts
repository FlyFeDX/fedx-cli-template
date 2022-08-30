import { Application } from '@midwayjs/koa';
import { ModuleConfig } from '@oss-bff/core';

/**
 * 模块的配置
 */
export default (app: Application) => {
    return {
        // 模块名称
        name: '模板项目',
        // 模块描述
        description: '',
    } as ModuleConfig;
};
