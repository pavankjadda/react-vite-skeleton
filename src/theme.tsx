import variables from './assets/css/custom-variables.module.scss';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			main: variables.primaryColor,
		},
		secondary: {
			main: variables.secondaryColor,
		},
		success: {
			main: variables.successColor,
		},
		error: {
			main: variables.errorColor,
		},
		background: {
			default: variables.backgroundColor,
		},
	},
	components: {
		// @ts-ignore
		MuiDataGrid: {
			styleOverrides: {
				root: {
					'--DataGrid-containerBackground': '#FFFFFF',
				},
			},
		},
	},
});

export default theme;
