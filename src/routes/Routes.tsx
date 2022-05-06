import {Route, Switch} from "react-router-dom";
import React from "react";
import {AdminGuardedRoute} from "./AdminGuardedRoute";
import {ReadOnlyAccessGuardedRoute} from "./ReadOnlyAccessGuardedRoute";
import {DataUserGuardedRoute} from "./DataUserGuardedRoute";
import useAuthService from "../hooks/useAuthService";
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ReportsSearchPage from '../pages/ReportsSearchPage';
import ManageAdGroupPage from '../pages/ManageAdGroupPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import UnauthorizedPage from '../pages/UnAuthorizedPage';
import FaqPage from '../pages/FaqPage';
import NotFoundPage from '../pages/NotFoundPage';


/**
 * Define all Routes and Sub-Routes
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export default function Routes(): JSX.Element {
    const {isReadOnlyUser, isDataUser, isSysAdmin} = useAuthService();
    return <div>
        <Switch>
            {/* Read Only User Routes */}
            <ReadOnlyAccessGuardedRoute component={HomePage} path={"/"} isAuthorized={isReadOnlyUser()}
                                        exact={true}/>
            <ReadOnlyAccessGuardedRoute component={HomePage} path={"/home"} isAuthorized={isReadOnlyUser()}
                                        exact={true}/>
            <ReadOnlyAccessGuardedRoute component={ProfilePage} path={"/profile"} isAuthorized={isReadOnlyUser()}
                                        exact={true}/>

            {/* Report Routes */}
            <DataUserGuardedRoute component={ReportsSearchPage} path={"/report"} isAuthorized={isDataUser()}
                                  exact={true}/>

            {/* Admin Routes */}
            <AdminGuardedRoute component={ManageAdGroupPage} path={"/admin/group/manage"} isAuthorized={isSysAdmin()}
                               exact={true}/>

            {/* Core Routes */}
            <Route component={LoginPage} path={"/login"} exact={true}/>
            <Route component={LogoutPage} path={"/logout"} exact={true}/>
            <Route component={UnauthorizedPage} path={"/unauthorized"} exact={true}/>
            <Route component={FaqPage} path={"/faq"} exact={true}/>
            <Route component={NotFoundPage} path={"*"}/>

        </Switch>
    </div>;
}

