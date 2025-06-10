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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ListItemButton } from '@mui/material';

/**
 * Define Side Bar content in a string
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export function DrawerContent(): React.JSX.Element {
	const navigate = useNavigate();

	return (
		<div>
			<div className={'drawerContainer'}>
				<h5 className={'banner'}>CRA Skeleton App</h5>
				<Divider className={'divider'} />

				{/* Book Section */}
				<List style={{ marginTop: '20px' }}>
					{/* Home */}
					<ListItem key="Home" onClick={() => navigate('/')}>
						<ListItemButton>
							<ListItemIcon className="listItemIcon">{<HomeIcon />}</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>

					{/* Find Book */}
					<ListItem key="Book Search" onClick={() => navigate('/book/find')}>
						<ListItemButton>
							<ListItemIcon className="listItemIcon">{<SearchIcon />}</ListItemIcon>
							<ListItemText primary="Find Book" />
						</ListItemButton>
					</ListItem>

					{/* All Books */}
					<ListItem key="All Books" onClick={() => navigate('/book/all')}>
						<ListItemButton>
							<ListItemIcon className="listItemIcon">{<FormatListBulletedIcon />}</ListItemIcon>
							<ListItemText primary="All Books" />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />

				<Divider className={'divider'} />
				{/* Help Section */}
				<List>
					{/* Account */}
					<ListItem key="Account" onClick={() => navigate('/profile')}>
						<ListItemButton>
							<ListItemIcon className="listItemIcon">{<AccountCircleIcon />}</ListItemIcon>
							<ListItemText primary="Account" />
						</ListItemButton>
					</ListItem>
					{/* Help */}
					<ListItem key="Home" onClick={() => navigate('/help')}>
						<ListItemButton>
							<ListItemIcon className="listItemIcon">{<HelpIcon />}</ListItemIcon>
							<ListItemText primary="Help" />
						</ListItemButton>
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
