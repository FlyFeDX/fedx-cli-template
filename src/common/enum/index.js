import { Enums } from 'oss-web-common';
import common from './common';

const { rebuild } = Enums;
let enumsContainer = Object.assign({}, common);
rebuild.call(enumsContainer);

export default enumsContainer;
