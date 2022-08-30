import { Provide, Post, Body, Inject, Get } from '@midwayjs/decorator';
import { OssBffCoreController, BaseController } from '@oss-bff/core';
import { DemoService } from '../service/demo';

@Provide()
@OssBffCoreController({
    api: ['add', 'delete', 'update', 'detail', 'list', 'pagination'],
    entity: 'DemoEntity',
    service: DemoService,
    // 列表查询配置
    listQueryOption: {
        //让name字段支持模糊查询
        keyWordLikeFields: ['DemoEntity.name'],
        // 添加排序
        orderBy: {
            'DemoEntity.createTime': 'asc',
        },
    },
})
export class DemoController extends BaseController {
    @Inject()
    demoService: DemoService;

    /**
     * demo1接口
     */
    @Get('/demo1')
    async demo1() {
        const result = await this.demoService.demo1();
        return this.success(result);
    }

    /**
     * demo2接口
     */
    @Post('/demo2')
    async demo2() {
        const result = await this.demoService.demo2();
        return this.success(result);
    }

    /**
     * demo3接口
     */
    @Post('/demo3')
    async demo3(@Body('tableName') tableName: string) {
        const result = await this.demoService.demo3(tableName);
        return this.success(result);
    }
}
