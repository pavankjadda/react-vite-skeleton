import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

/**
 * Data User access auth guard
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export function DataUserGuardedRoute({ children }: { children: React.JSX.Element }): React.JSX.Element {
	const location = useLocation();
	const { isUserLoggedIn } = useAuthService();
	const { isDataUser } = useAuthService();

	if (!isUserLoggedIn()) return <Navigate to="login" state={{ from: location }} replace />;
	else if (isUserLoggedIn() && !isDataUser()) return <Navigate to="unauthorized" state={{ from: location }} replace />;
	return children;
}
