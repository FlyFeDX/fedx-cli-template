import { createWebRequest } from 'oss-web-common';
import { useEnvironmentModel } from '@Src/hox';
let requestTransforms = [];
let responseTransforms = [];
const { environment: env, environmentLoaded: envLoaded } = useEnvironmentModel.data;
const { timeout = 20000 } = env;
requestTransforms.push((res) => {
    try {
        const { url, baseUrlType = '' } = res;
        if (envLoaded && env && baseUrlType) {
            const {
                servicesConfig: {
                    [baseUrlType]: { mode = '', direct: realurl = '', discover = '' },
                },
                serviceDiscovery,
            } = env;
            if (mode === 'direct') {
                res.url = `${realurl}${url}`;
            } else if (mode === 'discover') {
                res.url = `${serviceDiscovery}/${discover}${url}`;
            }
        }
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
});
responseTransforms.push((response) => {
    //   接口返回根据状态进行后续操作,如通知框架进行操作
    return response;
});
const config = {
    timeout,
    contentType: 'application/json',
    withCredentials: false,
    responseTransforms: [],
    requestTransforms,
    baseUrl: '',
};
export default createWebRequest(config);
