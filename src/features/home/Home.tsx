import useCookies from '@js-smart/react-cookie-service';
import { initializeState, markError, markLoading, markSuccess, ProgressState, ReactIf } from '@js-smart/react-kit';
import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HomeService } from '../../services/HomeService';
import { updateUser } from '../../state/reducers/UserReducer';
import BookTile from './book-tile/BookTile';
import HelpTile from './help-tile/HelpTile';

export default function Home(): React.JSX.Element {
	const [loadingState, setLoadingState] = useState<ProgressState>(initializeState());
	const { setCookie } = useCookies();
	const dispatch = useDispatch();

	/**
	 * Get user information. This validates existing session and gets updated user information
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	useEffect(() => {
		setLoadingState(markLoading(loadingState));
		HomeService.getUserInformation()
			.then((response) => {
				setLoadingState(markSuccess(loadingState));
				dispatch(updateUser(response.data));
				setCookie('currentUser', JSON.stringify(response.data));
			})
			.catch((error) => {
				setLoadingState(markError(loadingState, 'An error occurred while loading the documents. Error: ' + error));
			});
	}, []);

	return (
		<div className="container-fluid">
			{/* Alert block */}
			<ReactIf condition={!loadingState.isLoading && loadingState.isError}>
				<div className="row">
					<Alert className="app-flex-justify-center" severity="error">
						{loadingState.message}
					</Alert>
				</div>
			</ReactIf>

			<BookTile />
			<HelpTile />
		</div>
	);
}
