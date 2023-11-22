import styles from './SideBar.module.scss';
import Drawer from '@mui/material/Drawer';
import React from 'react';
import Hidden from '@mui/material/Hidden';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import DrawerContent from './DrawerContent';
import ReactIf from '../../../components/ReactIf';

export default function SideBar(): React.JSX.Element {
	const drawerOpen = useSelector((state: RootState) => state.preferences.drawerOpen);
	return (
		<div>
			{/* Show in Desktop View (Hide in Tablet/Mobile View) */}
			<ReactIf condition={drawerOpen}>
				<Hidden only={['xs', 'sm', 'md']}>
					<Drawer elevation={24} className={styles.drawer} variant="permanent" classes={{ paper: styles.drawerPaper }}>
						<DrawerContent />
					</Drawer>
				</Hidden>
			</ReactIf>

			{/* Show in Tablet/Mobile View(Hide in Desktop View) */}
			<Hidden only={['lg', 'xl']}>
				<Drawer
					className={styles.drawer}
					variant="temporary"
					open={false}
					anchor="left"
					classes={{
						paper: styles.drawerPaper,
					}}>
					<DrawerContent />
				</Drawer>
			</Hidden>
		</div>
	);
}
