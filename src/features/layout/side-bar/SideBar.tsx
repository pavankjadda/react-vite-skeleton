import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { ReactIf } from '@js-smart/react-kit';
import { DrawerContent } from './DrawerContent';

export default function SideBar(): React.JSX.Element {
	const drawerOpen = useSelector((state: RootState) => state.preferences.drawerOpen);
	return (
		<div>
			{/* Show in Desktop View (Hide in Tablet/Mobile View) */}
			<ReactIf condition={drawerOpen}>
				<Drawer
					elevation={24}
					sx={{ display: { xs: 'none', lg: 'block' } }}
					className="drawer"
					variant="permanent"
					classes={{ paper: 'drawerPaper' }}>
					<DrawerContent />
				</Drawer>
			</ReactIf>

			{/* Show in Tablet/Mobile View(Hide in Desktop View) */}
			<Drawer
				className="drawer"
				variant="temporary"
				open={false}
				anchor="left"
				sx={{ xs: 'block', sm: 'block', md: 'block', lg: 'block' }}
				classes={{
					paper: 'drawerPaper',
				}}>
				<DrawerContent />
			</Drawer>
		</div>
	);
}
