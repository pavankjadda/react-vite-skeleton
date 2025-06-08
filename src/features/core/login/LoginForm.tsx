import { yupResolver } from '@hookform/resolvers/yup';
import useCookies from '@js-smart/react-cookie-service';
import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ProgressState } from '../../../components/ProgressState';
import { ROLE_CORE_USER } from '../../../constants/AuthorityConstants';
import { HTTP_403, HTTP_500 } from '../../../constants/HttpConstants';
import { SUCCESS } from '../../../constants/StateConstants';
import { LoginService } from '../../../services/LoginService';
import { resetReduxStore } from '../../../state/reducers/RootReducer';
import { createUser } from '../../../state/reducers/UserReducer';
import { isUndefinedOrNullOrEmpty } from '../../../util/StringUtils';
import { initializeState, markError } from '../../../util/UpdateStateUtils';
import './Login.scss';

interface LoginFormInput {
	username: string;
	password: string;
}

const schema = Yup.object({
	username: Yup.string().max(40, 'Must be 40 characters or less').required('User name is Required'),
	password: Yup.string().max(40, 'Must be 40 characters or less').required('Password is Required'),
});

export default function LoginForm(): React.JSX.Element {
	const [loadingState, setLoadingState] = useState<ProgressState>(initializeState());
	const { getCookie, setCookie, deleteAllCookies } = useCookies();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginFormInput>({
		resolver: yupResolver(schema),
		mode: 'all',
	});

	/**
	 * Save Redirect URL and clear all cookies on load. Set `redirectUrl` again
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	useEffect(() => {
		// @ts-ignore
		const redirectUrl = (location?.state?.from?.pathname as string) ?? getCookie('redirectUrl');
		deleteAllCookies();
		dispatch(resetReduxStore());
		setCookie('redirectUrl', redirectUrl);
	}, []);

	/**
	 * Login user and save token to cookies
	 *
	 * @param data LoginFormInput data
	 *
	 * @author Pavan Kumar Jadda
	 * @since 0.1.0
	 */
	const loginUser: SubmitHandler<LoginFormInput> = (data) => {
		setLoadingState((loadingState) => ({
			...loadingState,
			loading: true,
		}));

		LoginService.loginUser(data.username, data.password)
			.then((response) => {
				setLoadingState((loadingState) => ({
					...loadingState,
					loading: false,
				}));

				//Check if user has proper roles to log in to the system
				if (response.data.authorities.find((authority) => authority.name === ROLE_CORE_USER) === undefined) {
					setLoadingState(
						markError(loadingState, 'Login unsuccessful. You are not authorized to login into CRA Skeleton App. Please contact support')
					);
				} else {
					setLoadingState((loadingState) => ({
						...loadingState,
						loading: false,
						status: SUCCESS,
					}));
					//Set Cookies and update Redux state
					setCookie('X-Auth-Token', response.data.token);
					setCookie('currentUser', JSON.stringify(response.data));
					setCookie('isLoggedIn', 'true');

					//Update user in State
					dispatch(createUser(response.data));

					// Navigate to previous page or home page
					navigate(
						isUndefinedOrNullOrEmpty(getCookie('redirectUrl')) || getCookie('redirectUrl') === '/login'
							? '/home'
							: getCookie('redirectUrl'),
						{
							replace: true,
						}
					);
				}
			})
			.catch((error) => {
				markError(loadingState, '');
				//Set error status and message
				if (error?.response?.status === HTTP_403) {
					markError(loadingState, '');
				} else if (error?.response?.status >= HTTP_500) {
					markError(loadingState, 'Login unsuccessful.  Unable to contact the server, please try again after few minutes');
				} else {
					markError(loadingState, 'Login unsuccessful. ' + error?.response?.data);
				}
			});
	};

	return (
		<form onSubmit={handleSubmit(loginUser)} noValidate>
			<Typography
				component="div"
				variant="h4"
				className="custom-head-primary custom-flex-justify-center"
				style={{ margin: '20px', fontWeight: 'bold' }}>
				Login
			</Typography>

			{/* Username */}
			<Grid container className="custom-flex-justify-center" style={{ padding: '20px' }}>
				<Controller
					name="username"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							fullWidth
							id="username"
							label="Username"
							variant="filled"
							placeholder="Use your Username"
							error={errors.username !== undefined}
							helperText={errors.username && errors.username.message}
							{...field}
							required
						/>
					)}
				/>
			</Grid>

			{/* Password */}
			<Grid container className="custom-flex-justify-center" style={{ padding: '20px' }}>
				<Controller
					name="password"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							fullWidth
							type="password"
							id="password"
							label="Password"
							variant="filled"
							placeholder="Use your Password"
							error={errors.password !== undefined}
							helperText={errors.password && errors.password.message}
							{...field}
							required
						/>
					)}
				/>
			</Grid>

			{/* Submit button */}
			<div className="custom-flex-justify-center" style={{ padding: '20px' }}>
				<Button
					style={{ minWidth: '200px' }}
					type="submit"
					loading={loadingState.loading}
					loadingPosition={'center'}
					color="primary"
					variant="contained"
					className="mx-auto">
					Login
				</Button>
			</div>
			{/* Loading Error */}
			<div className="row" style={{ padding: '20px' }}>
				{!loadingState.loading && loadingState.error && <h6 style={{ color: 'red' }}>{loadingState.message}</h6>}
			</div>
		</form>
	);
}
