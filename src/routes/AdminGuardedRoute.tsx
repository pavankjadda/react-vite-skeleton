import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import ReactIf from "../components/shared/ReactIf";
import useAuthService from "../hooks/useAuthService";

/**
 * Admin access auth guard
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export function AdminGuardedRoute(props: { component: any; path: string; isAuthorized: boolean, exact: boolean }): JSX.Element {
  const {component: Component, isAuthorized, ...rest} = props;
  const {isUserLoggedIn} = useAuthService();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        <div>
          {/* If not logged in, redirect to Login page */}
          <ReactIf condition={!isUserLoggedIn()}>
            <Redirect
              to={{
                pathname: '/login',
                state: {from: routeProps.location}
              }}
            />
          </ReactIf>

          {/* If logged in and has Sys Admin role, navigate to component */}
          <ReactIf condition={isAuthorized}>
            <Component {...routeProps} />
          </ReactIf>

          {/* If logged in but does not have Sys Admin role, navigate to Unauthorized page */}
          <ReactIf condition={!isAuthorized}>
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {from: routeProps.location}
              }}
            />
          </ReactIf>
        </div>
      }
    />
  );
}
