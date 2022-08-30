import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@oss-bff/core';
import { InjectEntityModel } from '@oss-bff/orm';
import { Repository } from 'typeorm';

@Provide()
export class DemoService extends BaseService {
    @InjectEntityModel('DemoEntity')
    demoEntityModel: Repository<any>;

    async demo1() {
        return await this.demoEntityModel.find();
    }

    async demo2() {
        const result = await this.nativeQuery('select * from user_tables');
        return result;
    }

    async demo3(tableName) {
        const result = await this.myBatisQuery(
            'sqlMapSampleConfig',
            'selectUserTableSql',
            { tableName }
        );
        return result;
    }
}
