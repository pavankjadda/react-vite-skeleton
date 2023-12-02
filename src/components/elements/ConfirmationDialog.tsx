import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { NO, YES } from '../../constants/Labels';

export interface ConfirmDialogProps {
	id: string;
	keepMounted: boolean;
	title?: string;
	message: string;
	value: string;
	open: boolean;
	onClose: (value: string) => void;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
	const { onClose, title, message, open, ...other } = props;

	return (
		<Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open} {...other}>
			<DialogTitle>{title ?? 'Confirm'}</DialogTitle>
			<DialogContent dividers>{message}</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={() => onClose(NO)}>
					Cancel
				</Button>
				<Button onClick={() => onClose(YES)}>Yes</Button>
			</DialogActions>
		</Dialog>
	);
}
