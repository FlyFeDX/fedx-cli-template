import { Aspect, IMethodAspect, JoinPoint, Provide } from '@midwayjs/decorator';
import { DemoController } from '../modules/moduleDemo/controller/demo';
import { _ } from 'oss-bff-toolkits';

function transformCamelCase(data) {
    if (!_.isObjectLike(data) || _.isDate(data)) {
        return data;
    }

    const initValue = Array.isArray(data) ? [] : {};
    return _.transform(
        data,
        (transformResult, current, key) => {
            const camelCaseKey = _.camelCase(key);
            if (_.isObjectLike(current)) {
                transformResult[camelCaseKey] = transformCamelCase(current);
            } else {
                transformResult[camelCaseKey] = current;
            }
            return transformResult;
        },
        initValue
    );
}

@Provide()
@Aspect(DemoController, 'home')
export class ResultToCamelCase implements IMethodAspect {
    // 执行成功才会执行此切面
    async afterReturn(joinPoint: JoinPoint, origin: any) {
        let result = await origin;
        result.data = transformCamelCase(result.data);
        return result;
    }
}
