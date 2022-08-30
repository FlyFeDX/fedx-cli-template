import React, { useEffect } from 'react';
import { Layout, ConfigProvider, Icon } from 'oss-ui';
import { ErrorBoundary } from 'oss-web-common';
import useLoginInfoModel, { useEnvironmentModel } from '@Src/hox';
import GlobalMessage from '@Src/common/global-message';
import shareActions from '@Src/share/actions';
import { useHistory } from 'react-router';
import routes, { mapRoutes, Switch } from './routes';
import { AliveScope } from 'react-activation';
import './styles/App.less';
const { Content } = Layout;

const customizeRenderEmpty = () => (
    //这里面就是我们自己定义的空状态
    <div className="oss-container-empty">
        <Icon type="iconzanwushuju" style={{ fontSize: 60, marginBottom: 5 }} />
        <p style={{ fontSize: 18 }}>暂无数据</p>
    </div>
);
const changeTheme = (theme) => {
    const { actions, messageTypes } = shareActions;
    actions && actions.postMessage && actions.postMessage(messageTypes.changeTheme, theme);
};

function OssApp(props) {
    const { environmentLoaded } = useEnvironmentModel();
    const login = useLoginInfoModel();
    const { curRoute } = props;
    const history = useHistory();

    useEffect(() => {
        if (curRoute) {
            history.push(curRoute);
        }
        if (login) {
            let isFirstChangeState = true;
            const { setUserName, setUserId, setUserInfo, setContainer, setSystemInfo, setUuIdValue, setSrcString } = login;
            props.onGlobalStateChange &&
                props.onGlobalStateChange((value, _prev) => {
                    setUserName(value?.userInfo?.userName);
                    setUserId(value?.userInfo?.userId);
                    setUserInfo(value?.userInfo && JSON.stringify(value.userInfo));
                    setContainer(props.container);
                    setSystemInfo(value?.systemInfo);
                    setUuIdValue(props.uuid);
                    setSrcString(props.src);

                    if (isFirstChangeState && value?.systemInfo?.theme !== 'light') {
                        changeTheme(value?.systemInfo?.theme);
                        isFirstChangeState = false;
                    }
                }, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let currentTheme = null;
        const { systemInfo } = login;
        GlobalMessage.off('activeChanged', null, null);
        GlobalMessage.on('activeChanged', ({ isActive }) => {
            if (isActive && currentTheme !== systemInfo?.theme) {
                changeTheme(systemInfo?.theme);
                currentTheme = systemInfo?.theme;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login.systemInfo?.theme]);

    return (
        <ConfigProvider prefixCls="oss-ui" renderEmpty={customizeRenderEmpty}>
            <Layout className="oss-layout">
                <Content className="oss-layout-content">
                    <ErrorBoundary>
                        {environmentLoaded && (
                            <Switch>
                                <AliveScope>{mapRoutes(routes)}</AliveScope>
                            </Switch>
                        )}
                    </ErrorBoundary>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default OssApp;
