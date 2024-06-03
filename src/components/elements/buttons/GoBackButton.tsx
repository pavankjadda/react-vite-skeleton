import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
	const navigate = useNavigate();

	return (
		<Tooltip title="Go Back to Previous Page">
			<IconButton color="primary" onClick={() => navigate(-1)}>
				<ArrowBackIosIcon />
			</IconButton>
		</Tooltip>
	);
}
