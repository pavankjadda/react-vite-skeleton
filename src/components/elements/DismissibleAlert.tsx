import { Alert, AlertColor, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Dismissible Alert properties
 *
 * @author Pavan Kumar Jadda
 * @since 0.2.17
 */
type DismissibleAlertProps = {
	message: string;
	severity: AlertColor;
	className?: string;
	dismissible?: boolean;
	dismissOnTimeOut?: boolean;
	dismissTimeOut?: number;
};

function DismissibleAlert(props: DismissibleAlertProps) {
	const [open, setOpen] = useState(true);
	const [dismissible] = useState(props.dismissible ?? true);
	const [dismissOnTimeOut] = useState(props.dismissOnTimeOut ?? true);
	const [dismissTimeOut] = useState<number>(props.dismissTimeOut ?? 5000);

	/**
	 * If `dismissOnTimeOut` is set then Dismiss the alert on time out
	 *
	 * @author Pavan Kumar Jadda
	 * @since 0.2.17
	 */
	setTimeout(() => {
		dismissOnTimeOut ? setOpen(false) : setOpen(open);
	}, dismissTimeOut);

	return (
		<>
			{open && (
				<Alert
					action={
						dismissible ? (
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
								}}>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						) : (
							<></>
						)
					}
					style={{ margin: '20px' }}
					{...props}>
					{props.message}
				</Alert>
			)}
		</>
	);
}

export default DismissibleAlert;
