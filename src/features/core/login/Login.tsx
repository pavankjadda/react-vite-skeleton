import React from 'react';
import './Login.scss';
import { Grid, Paper } from '@mui/material';
import LoginForm from './LoginForm';

export default function Login(): React.JSX.Element {
	return (
		<Grid className="app-flex-justify-center" container>
			<Grid className="login-card" size={{ sm: 10, md: 8, lg: 6, xl: 6 }}>
				<Paper elevation={12} className="col-xs-12 col-sm-12 com-md-6 col-lg-6 col-xl-4 col-xxl-4 col-xxxl-3 mx-auto login-card">
					{/* Login Form */}
					<LoginForm />
				</Paper>
			</Grid>
		</Grid>
	);
}
