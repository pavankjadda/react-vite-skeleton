import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import styles from './SideBar.module.scss';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

/**
 * Define Side Bar content in a string
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
function DrawerContent(): JSX.Element {
	const navigate = useNavigate();

	return (
		<div>
			<div className={styles.drawerContainer}>
				<h5 className={styles.banner}>CRA Skeleton App</h5>
				<Divider className={styles.divider} />

				{/* Book Section */}
				<List style={{ marginTop: '20px' }}>
					{/* Home */}
					<ListItem button key="Home" onClick={() => navigate('/')}>
						<ListItemIcon className={styles.listItemIcon}>{<HomeIcon />}</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>

					{/* Find Book */}
					<ListItem button key="Book Search" onClick={() => navigate('/book/find')}>
						<ListItemIcon className={styles.listItemIcon}>{<SearchIcon />}</ListItemIcon>
						<ListItemText primary="Find Book" />
					</ListItem>

					{/* All Books */}
					<ListItem button key="All Books" onClick={() => navigate('/book/all')}>
						<ListItemIcon className={styles.listItemIcon}>{<FormatListBulletedIcon />}</ListItemIcon>
						<ListItemText primary="All Books" />
					</ListItem>
				</List>
				<Divider />

				<Divider className={styles.divider} />
				{/* Help Section */}
				<List>
					{/* Account */}
					<ListItem button key="Account" onClick={() => navigate('/profile')}>
						<ListItemIcon className={styles.listItemIcon}>{<AccountCircleIcon />}</ListItemIcon>
						<ListItemText primary="Account" />
					</ListItem>
					{/* Help */}
					<ListItem button key="Home" onClick={() => navigate('/help')}>
						<ListItemIcon className={styles.listItemIcon}>{<HelpIcon />}</ListItemIcon>
						<ListItemText primary="Help" />
					</ListItem>

					{/* Version */}
					<ListItem key="Version">
						<label>Version: {import.meta.env.REACT_APP_VERSION}</label>
					</ListItem>
				</List>
			</div>
		</div>
	);
}

export default DrawerContent;
