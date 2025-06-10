import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from '../../../routes/AppRoutes';
import Header from '../header/Header';
import SideBar from './SideBar';
import { Toolbar } from '@mui/material';
import theme from '../../../theme';
import useAuthService from '../../../hooks/useAuthService';

export default function SideBarContainer(): React.JSX.Element {
	const { isUserLoggedIn } = useAuthService();

	return (
		<div style={{ display: 'flex' }}>
			<CssBaseline />
			<Header />

			{/* Show the sidebar when user logged in */}
			{isUserLoggedIn() && <SideBar />}

			{/* Main Section */}
			<main style={{ flexGrow: 1, padding: `${theme.spacing(3)}` }}>
				<Toolbar />
				<AppRoutes />
			</main>
		</div>
	);
}
