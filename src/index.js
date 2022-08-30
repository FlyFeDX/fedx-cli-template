/** * * * * * * * * * * * * * * * * * * * * * * **
 *                    _ooOoo_                    *
 *                   o8888888o                   *
 *                   88" . "88                   *
 *                   (| -_- |)                   *
 *                   O\  =  /O                   *
 *                ____/`---'\____                *
 *              .'  \\|     |//  `.              *
 *             /  \\|||  :  |||//  \             *
 *            /  _||||| -:- |||||-  \            *
 *            |   | \\\  -  /// |   |            *
 *            | \_|  ''\---/''  |   |            *
 *            \  .-\__  `-`  ___/-. /            *
 *          ___`. .'  /--.--\  `. . __           *
 *       ."" '<  `.___\_<|>_/___.'  >'"".        *
 *      | | :  `- \`.;`\ _ /`;.`/ - ` : | |      *
 *      \  \ `-.   \_ __\ /__ _/   .-` /  /      *
 * ======`-.____`-.___\_____/___.-`____.-'====== *
 *                    `=---='                    *
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ *
 *             佛祖保佑       永无BUG              *
 *         此代码经过开光处理，不可能存在bug！        *
 * * * * * * * * * * * * * * * * * * * * * * * **/

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import App from './App';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from 'oss-web-common';
import globalMessage from '@Src/common/global-message';
import constants from './common/constants';
import { Icon, ConfigProvider } from 'oss-ui';
import { logger } from 'oss-web-toolkits';
import actions from './share/actions';

// Trace = 0,
// Debug = 1,
// Info = 2,
// Warning = 3,
// Error = 4
logger.default.level = logger.Level.trace;

const BASENAME = constants.BASE_NAME;
const containerStyle = { height: '100%' };
if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_RENDER !== 'true'
) {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackHooks: false,
    });
}

Icon.createFromIconfontCN({
    scriptUrl: `${constants.STATIC_PATH}/iconfont/iconfont.js`,
    prefixCls: '', // 或者 直接调用 Icon.prefixCls = 'xxx';
});

if (!window.__INJECT_BY_SINGLE_SPA__) {
    require('oss-ui/es/style/base.less');
    render({});
} else {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = `${constants.MICRO_APP_URL}/`;
}

// 项目启动加载
export async function bootstrap() {
    logger.default.info('[alarm] bootstraped');
}

// 渲染微应用
export async function mount(props) {
    logger.default.debug('[alarm] props from main framework', props);
    const { container } = props;
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '100%';
    storeGlobalState(props);
    if (props.renderType === 'modal_detail') {
        // 需要渲染 detail
        ReactDOM.render(
            <ConfigProvider prefixCls="oss-ui"></ConfigProvider>,
            props.container.querySelector('#root'),
        );
    } else {
        // 现在的渲染逻辑
        render(props);
    }
}

// 卸载项目
export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(
        (container || document).querySelector('#root'),
    );
}

export const update = async (props) => {
    const { isActive } = props;
    globalMessage.trigger('activeChanged', null, {
        isActive,
    });
};

async function render(props) {
    const {
        container,
        curRoute = '/',
        onGlobalStateChange,
        setGlobalState,
    } = props;
    if (!window.__INJECT_BY_SINGLE_SPA__) {
        await bootstrap();
    }
    if (props) {
        // 注入 actions 实例
        actions.setActions({ onGlobalStateChange, setGlobalState });
        actions.init();
    }
    ReactDOM.render(
        <React.StrictMode>
            <div className="{{projectName}}" style={containerStyle}>
                {/* <Provider> */}
                <LocaleProvider localePath={constants.LOCALES_PATH}>
                    {window.__INJECT_BY_SINGLE_SPA__ ? (
                        <MemoryRouter>
                            <App
                                curRoute={curRoute.replace(BASENAME, '')}
                                onGlobalStateChange={props.onGlobalStateChange}
                                container={props.container}
                                uuid={props.uuid}
                                src={props.src}
                            />
                        </MemoryRouter>
                    ) : (
                        <BrowserRouter basename={BASENAME}>
                            <App container={Document.body} />
                        </BrowserRouter>
                    )}
                </LocaleProvider>
                {/* </Provider> */}
            </div>
        </React.StrictMode>,
        (container || document).querySelector('#root'),
    );
}

function storeGlobalState(props) {
    props.onGlobalStateChange(
        (value, prev) =>
            logger.default.debug(
                `[onGlobalStateChange - ${props.name}]:`,
                value,
                prev,
            ),
        true,
    );
}
