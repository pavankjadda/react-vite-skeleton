import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { AdminGuardedRoute } from './AdminGuardedRoute';
import { ReadOnlyAccessGuardedRoute } from './ReadOnlyAccessGuardedRoute';
import { DataUserGuardedRoute } from './DataUserGuardedRoute';

// Lazy load all pages
const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const LogoutPage = React.lazy(() => import('../pages/LogoutPage'));
const UnauthorizedPage = React.lazy(() => import('../pages/UnAuthorizedPage'));
const FaqPage = React.lazy(() => import('../pages/FaqPage'));
const HelpPage = React.lazy(() => import('../pages/HelpPage'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ReportsSearchPage = React.lazy(() => import('../pages/ReportsSearchPage'));
const ManageAdGroupPage = React.lazy(() => import('../pages/ManageAdGroupPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const FindBookPage = React.lazy(() => import('../pages/FindBookPage'));
const AllBooksPage = React.lazy(() => import('../pages/AllBooksPage'));
const ViewBookPage = React.lazy(() => import('../pages/ViewBookPage'));

/**
 * Define all Routes and Sub-Routes
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export default function AppRoutes(): React.JSX.Element {
	return (
		<div>
			<Routes>
				{/* Core Routes */}
				<Route element={<LoginPage />} path="login" />
				<Route element={<LogoutPage />} path="logout" />
				<Route element={<UnauthorizedPage />} path="unauthorized" />
				<Route element={<FaqPage />} path="faq" />
				<Route element={<HelpPage />} path="help" />

				{/* Read Only User Routes */}
				<Route
					path="/"
					element={
						<ReadOnlyAccessGuardedRoute>
							<HomePage />
						</ReadOnlyAccessGuardedRoute>
					}
				/>
				<Route
					path="home"
					element={
						<ReadOnlyAccessGuardedRoute>
							<HomePage />
						</ReadOnlyAccessGuardedRoute>
					}
				/>
				<Route
					path="profile"
					element={
						<ReadOnlyAccessGuardedRoute>
							<ProfilePage />
						</ReadOnlyAccessGuardedRoute>
					}
				/>

				{/* Books Routes */}
				<Route path="book">
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<AllBooksPage />
							</ReadOnlyAccessGuardedRoute>
						}
						path="all"
					/>
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<FindBookPage />
							</ReadOnlyAccessGuardedRoute>
						}
						path="find"
					/>
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<ViewBookPage />
							</ReadOnlyAccessGuardedRoute>
						}
						path=":id"
					/>
				</Route>

				{/* Report Routes */}
				<Route
					element={
						<DataUserGuardedRoute>
							<ReportsSearchPage />
						</DataUserGuardedRoute>
					}
					path="report"
				/>

				{/* Admin Routes */}
				<Route path="admin">
					<Route
						element={
							<AdminGuardedRoute>
								<ManageAdGroupPage />
							</AdminGuardedRoute>
						}
						path="group/manage"
					/>
				</Route>

				<Route element={<NotFoundPage />} path="*" />
			</Routes>
		</div>
	);
}
