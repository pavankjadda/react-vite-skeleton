import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ManageButtonProps {
	url: string;
	size?: 'small' | 'medium' | 'large';
	startIcon?: React.ReactNode;
}

export default function ManageButton(props: ManageButtonProps) {
	const navigate = useNavigate();

	return (
		<Button
			className="pushRight"
			onClick={() => navigate(props.url)}
			variant="contained"
			color="primary"
			size={props.size ?? 'large'}
			startIcon={props.startIcon ?? <SettingsIcon />}>
			Manage
		</Button>
	);
}
