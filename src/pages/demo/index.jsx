import React from 'react';
import { ProTable } from 'oss-ui';
import useLoginInfoModel from '@Src/hox';
import { testDemoApi } from '@Src/service/testDemoApi';
const columns = [
    {
        dataIndex: 'id',
        title: 'ID',
    },
    {
        dataIndex: 'name',
        title: '名称',
    },
    {
        dataIndex: 'describe',
        title: '描述',
    },
    {
        dataIndex: 'creater',
        title: '用户',
    },
];

const Index = () => {
    const params = {
        userId: useLoginInfoModel.data.userId,
    };
    return (
        <ProTable
            columns={columns}
            // dataSource={[]}
            rowKey="id"
            params={params}
            request={async (param) => {
                let res = await testDemoApi.getTestDemoList(param);
                return {
                    data: res.data,
                    success: res.success,
                    total: res.data?.length,
                };
            }}
        />
    );
};

export default Index;
