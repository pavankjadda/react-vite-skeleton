import { Alert, Card, CardContent, Checkbox, Divider, List, ListItem, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { User } from '../user/User';
import useCookies from '@js-smart/react-cookie-service';
import { UserService } from '../../services/UserService';
import { initializeState, markError, markSuccess, ProgressState, ReactIf } from '@js-smart/react-kit';

export default function Profile(): React.JSX.Element {
	const { check, getCookie } = useCookies();
	const [user] = useState<User | undefined>(check('currentUser') ? (JSON.parse(getCookie('currentUser')) as User) : undefined);
	const [userProfile, setUserProfile] = useState<User | undefined>();
	const [loadingState, setLoadingState] = useState<ProgressState>(initializeState());
	useEffect(() => {
		UserService.getUserProfileInformation(user?.username)
			.then((response) => {
				setLoadingState(markSuccess(loadingState));
				setUserProfile(response.data);
			})
			.catch((error) => {
				setLoadingState(markError(loadingState, 'An error occurred while loading the profile. Error: ' + error));
			});
	}, [user]);

	return (
		<Card>
			<Typography style={{ margin: '10px' }} className="custom-flex-justify-center" variant="h4" component="div">
				Profile
			</Typography>
			<Divider />

			{/* Alert */}
			<ReactIf condition={!loadingState.isLoading && loadingState.isError}>
				<Alert severity="error">Unable to get profile information, please try again after sometime</Alert>
			</ReactIf>

			{/* Basic Information */}
			<CardContent>
				<Typography style={{ marginBottom: '30px', fontWeight: 'bold' }} variant="h6" component="div">
					Basic Information
				</Typography>

				<div className="row" style={{ marginLeft: '10px' }}>
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<label style={{ fontWeight: 'bold', marginRight: '1rem' }} className="row">
							First Name:
						</label>
						<label className="row">{userProfile?.firstName}</label>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<label style={{ fontWeight: 'bold', marginRight: '1rem' }} className="row">
							Last Name:
						</label>
						<label className="row">{userProfile?.lastName}</label>
					</div>
				</div>

				<div className="row" style={{ marginLeft: '10px' }}>
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<label style={{ fontWeight: 'bold', marginRight: '1rem' }} className="row">
							Username:
						</label>
						<label className="row">{user?.username}</label>
					</div>

					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<label style={{ fontWeight: 'bold', marginRight: '1rem' }} className="row">
							Email:
						</label>
						<label className="row">{userProfile?.email}</label>
					</div>
				</div>
			</CardContent>

			<Divider />

			{/* Assigned AD Groups */}
			<CardContent>
				<Typography style={{ marginBottom: '20px', fontWeight: 'bold' }} variant="h6" component="div">
					Assigned Groups
				</Typography>

				<List>
					{userProfile?.groups?.map((group) => (
						<ListItem key={group.adGroupName} disablePadding>
							<ListItemButton>
								<Checkbox edge="start" checked={true} tabIndex={-1} disabled={true} disableRipple />
								{group?.adGroupName}
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}
