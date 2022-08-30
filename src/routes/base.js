import React, { Suspense } from 'react';
import { _ } from 'oss-web-toolkits';
import { Spin } from 'oss-ui';
import { Switch, Route } from 'react-router';
import KeepAlive from 'react-activation';
export { Route, Switch };

function containerComponent(props) {
    return <props.component {..._.omit(props, 'component')} />;
}

export const mapRoutes = (routes, match, props) => (
    <Suspense
        fallback={
            <Spin
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: '999',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        }
    >
        {routes.map((route, index) => {
            if (match) {
                route = _.clone(route);
                route.path = match.url + route.path;
            }
            return (
                <Route
                    key={index}
                    {..._.omit(route, 'component', 'routes')}
                    render={(props2) => {
                        const containerProps = {
                            path: route.path,
                            pathname: route.path,
                            component: route.component,
                            routes: route.routes,
                            parentMatch: match,
                            ...props,
                            ...props2,
                        };
                        let componentResult = containerComponent(containerProps);
                        if (route.keepAlive) {
                            return <KeepAlive>{componentResult}</KeepAlive>;
                        }
                        return componentResult;
                    }}
                />
            );
        })}
    </Suspense>
);
