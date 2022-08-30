import { getMicroUrl } from 'oss-web-common';

const { PUBLIC_URL, NODE_ENV, REACT_APP_KEY, REACT_APP_CONFIG_HOST, REACT_APP_CONFIG_LOCAL, REACT_APP_PROJECT_NAME } = process.env;
const isEnvProduction = NODE_ENV === 'production';
const BASE_NAME = '/' + REACT_APP_KEY;
const MICRO_APP_URL = isEnvProduction ? getMicroUrl(window) + BASE_NAME : getMicroUrl(window);
const STATIC_PATH = `${MICRO_APP_URL}/static`;
const IMAGE_PATH = `${STATIC_PATH}/images`;
const IMP_ALARM_REPORT = `${MICRO_APP_URL}/report`;
const LOCALES_PATH = `${STATIC_PATH}/locales`;

const constants = {
    BASE_NAME,
    STATIC_PATH,
    IMAGE_PATH,
    PUBLIC_URL,
    LOCALES_PATH,
    IMP_ALARM_REPORT,
    MICRO_APP_URL,
    CONFIG_HOST: REACT_APP_CONFIG_HOST || '',
    CONFIG_LOCAL: REACT_APP_CONFIG_LOCAL,
    PROJECTNAME: REACT_APP_PROJECT_NAME,
};
export default constants;
