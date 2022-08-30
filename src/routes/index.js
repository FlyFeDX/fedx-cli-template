import { router } from 'oss-web-common';
const routes = [
    {
        exact: true,
        path: '/',
        component: 'test',
        routes: [],
    },
    {
        exact: true,
        path: '/demo',
        component: 'demo',
        routes: [],
        keepAlive:true
    },
];
const allRouter = router.buildRoutes(routes);
export * from './base';
export default allRouter;
