import { EntityModel, BaseEntityMysql } from '@oss-bff/orm';
import { Column } from 'typeorm';

@EntityModel('TABLE1', { connectionName: 'default', type: 'mysql' })
export class DemoEntity extends BaseEntityMysql {
    @Column({
        name: 'NAME',
    })
    name: string | null;
}
