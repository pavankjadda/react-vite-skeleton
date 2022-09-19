import React, { useEffect, useState } from 'react';
import BookTile from './book-tile/BookTile';
import HelpTile from './help-tile/HelpTile';
import { HomeService } from '../../services/HomeService';
import { ProgressState } from '../../components/ProgressState';
import { initializeState, markError, markLoading, markSuccess } from '../../util/UpdateStateUtils';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../state/reducers/UserReducer';
import ReactIf from '../../components/ReactIf';
import { Alert } from '@mui/material';
import useCookies from '@js-smart/react-cookie-service';

export default function Home(): JSX.Element {
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
			<ReactIf condition={!loadingState.loading && loadingState.error}>
				<div className="row">
					<Alert className="custom-flex-justify-center" severity="error">
						{loadingState.message}
					</Alert>
				</div>
			</ReactIf>

			<BookTile />
			<HelpTile />
		</div>
	);
}
