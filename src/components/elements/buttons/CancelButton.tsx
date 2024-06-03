import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';

/**
 * Reusable Success Button component properties
 *
 * @author Pavan Kumar Jadda
 * @since 1.2.14
 */
interface CancelButtonProps {
	children?: React.ReactNode;
	className?: string;
	sx?: SxProps<Theme>;
	type?: 'button' | 'submit' | 'reset';
	onClick: () => void;
	startIcon?: React.ReactNode;
}

/**
 * Reusable Cancel Button component
 *
 * @author Pavan Kumar Jadda
 * @since 1.2.14
 */
export default function CancelButton(props: CancelButtonProps): React.JSX.Element {
	return (
		<Button
			className={props.className}
			sx={props.sx}
			startIcon={props.startIcon ?? <UndoIcon />}
			variant="contained"
			color="secondary"
			type={props.type ?? 'button'}
			onClick={() => props.onClick()}>
			{props.children}
		</Button>
	);
}
