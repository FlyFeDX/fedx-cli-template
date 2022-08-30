import { EntityModel, BaseEntityOracle } from '@oss-bff/orm';
import { Column } from 'typeorm';

@EntityModel('TABLE1', { connectionName: 'default', type: 'oracle' })
export class DemoEntity extends BaseEntityOracle {
    @Column({
        name: 'NAME',
    })
    name: string | null;

    @Column({
        name: 'SEX',
    })
    sex: string | null;
}
