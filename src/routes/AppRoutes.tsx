import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { AdminGuardedRoute } from './AdminGuardedRoute';
import { ReadOnlyAccessGuardedRoute } from './ReadOnlyAccessGuardedRoute';
import { DataUserGuardedRoute } from './DataUserGuardedRoute';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ReportsSearchPage from '../pages/ReportsSearchPage';
import ManageAdGroupPage from '../pages/ManageAdGroupPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import UnauthorizedPage from '../pages/UnAuthorizedPage';
import FaqPage from '../pages/FaqPage';
import NotFoundPage from '../pages/NotFoundPage';
import FindBookPage from '../pages/FindBookPage';
import AllBooksPage from '../pages/AllBooksPage';
import ViewBookPage from '../pages/ViewBookPage';
import HelpPage from '../pages/HelpPage';

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
