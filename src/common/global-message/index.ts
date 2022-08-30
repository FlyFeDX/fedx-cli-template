import { EventClass } from 'oss-web-toolkits';

class GlobalMessage extends EventClass {
    /**
     * 触发消息
     * @param eventSource 事件注册的组件
     * @param type        用于接受事件的组件内部判断事件类型
     * @param data        事件触发传递的参数
     */
    postMessage(eventSource = null, type: string, data: any) {
        this.trigger('message', eventSource, { type, data });
    }
}

export default new GlobalMessage();
