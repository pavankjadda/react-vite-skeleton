import React, { useEffect, useState } from 'react';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';
import { ProgressState } from '../../model/ProgressState';
import CloseIcon from '@mui/icons-material/Close';

export const AppSnackBar = (props: { open: boolean; progressState: ProgressState; autoHideDuration?: number }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(props.open);
	}, [props.open, props.progressState]);

	// Close button
	const action = (
		<>
			<IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<>
			{/* Success Alert */}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={open && props.progressState.success}
				autoHideDuration={props.autoHideDuration ?? 3000}
				onClose={() => setOpen(false)}>
				<Alert variant="filled" severity="success" sx={{ width: '100%' }} action={action}>
					{props.progressState.message}
				</Alert>
			</Snackbar>

			{/* Error Alert */}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={open && props.progressState.error}
				TransitionComponent={Slide}
				autoHideDuration={props.autoHideDuration ?? 3000}
				onClose={() => setOpen(false)}>
				<Alert variant="filled" sx={{ width: '100%' }} severity="error" action={action}>
					{props.progressState.message}
				</Alert>
			</Snackbar>
		</>
	);
};
