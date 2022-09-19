import './App.scss';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import SideBarContainer from './features/layout/side-bar/SideBarContainer';

export default function App(): JSX.Element {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SideBarContainer />
		</ThemeProvider>
	);
}
