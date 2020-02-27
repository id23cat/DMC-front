import React, { useEffect, useMemo } from "react";
import { Redirect, Route as HistoryRoute, Switch } from "react-router-dom";
import { GuardProps } from "./guards";
import { EventBus } from "../events/eventsButs";

interface Props {
    routes: Array<Route>;
}

export interface Route {
    component?: React.FC;
    path?: string;
    exact?: boolean;
    redirectTo?: string;
    guards?: Array<React.FC<GuardProps>>;
    className?: string;
}

export const RoutesModule = ({ routes }: Props) => {
    const renderedRoutes = useMemo(() => {
        return routes.map((route, index) => {
            const { exact, path, component, redirectTo, guards } = route;
            let cmp = wrapComponent(route, component);
            if (guards && !redirectTo) {
                cmp = applyGuards(guards, cmp!);
            }

            return redirectTo ? (
                <Redirect key={index} from={path} to={{ pathname: redirectTo }} exact={exact} />
            ) : (
                <HistoryRoute key={index} path={path} component={cmp} exact={exact} />
            );
        });
    }, [routes]);

    return <Switch>{renderedRoutes}</Switch>;
};

function applyGuards(guards: Array<React.FC<GuardProps>>, component: React.FC): React.FC {
    return guards.reduce((acc, Guard) => () => <Guard component={acc} />, component);
}

function wrapComponent(route: Route, Component?: React.FC): React.FC | undefined {
    if (!Component) {
        return;
    }

    return () => {
        useEffect(() => {
            EventBus.publish("routeChanged", route);
        }, []);

        return <Component />;
    };
}
