import request from '@Src/common/configs/api';

const baseUrlType = 'testDemoUrl';

class TestDemoApi {
    /**
     * 获取demo表格数据
     * @param {Object} data
     * @param {string} data.userId
     * @returns
     */
    async getTestDemoList(data) {
        const result = await request('demo1', {
            data,
            baseUrlType,
            type: 'get',
            showSuccessMessage: false,
        });
        // 建议在这里处理好返回数据直接交给展示层渲染,页面中不进行数据处理
        return result;
    }
}

export const testDemoApi = new TestDemoApi();
