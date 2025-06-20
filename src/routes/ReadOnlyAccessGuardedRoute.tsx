import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';

/**
 * Read-Only access auth guard
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export function ReadOnlyAccessGuardedRoute({ children }: { children: React.JSX.Element }): React.JSX.Element {
	const { isUserLoggedIn } = useAuthService();
	const location = useLocation();
	const { isReadOnlyUser } = useAuthService();

	if (!isUserLoggedIn()) return <Navigate to="login" state={{ from: location }} replace />;
	else if (isUserLoggedIn() && !isReadOnlyUser()) return <Navigate to="unauthorized" state={{ from: location }} replace />;
	return children;
}
