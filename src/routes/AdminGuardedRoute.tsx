import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

/**
 * Admin access auth guard
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export function AdminGuardedRoute({ children }: { children: JSX.Element }): JSX.Element {
	const { isUserLoggedIn } = useAuthService();
	let location = useLocation();
	const { isSysAdmin } = useAuthService();

	if (!isUserLoggedIn()) return <Navigate to="login" state={{ from: location }} replace />;
	else if (isUserLoggedIn() && !isSysAdmin()) return <Navigate to="unauthorized" state={{ from: location }} replace />;
	return children;
}
