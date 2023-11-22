import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styles from '../../layout/side-bar/SideBar.module.scss';
import HelpIcon from '@mui/icons-material/Help';
import BookIcon from '@mui/icons-material/Book';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useNavigate } from 'react-router-dom';

export default function HelpTile(): React.JSX.Element {
	const navigate = useNavigate();
	return (
		<div style={{ marginTop: '50px' }}>
			<Card className="container-fluid col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8" elevation={24}>
				<h3 className="custom-flex-justify-center" style={{ marginTop: '20px' }}>
					<HelpIcon style={{ marginRight: '10px' }} />
					Help
				</h3>
				<Divider />
				<CardContent className="row custom-flex-justify-center">
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon className={styles.listItemIcon}>{<BookIcon color={'primary'} />}</ListItemIcon>
								<ListItemText primary="User Guide (Coming Soon)" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate('/faq')}>
								<ListItemIcon className={styles.listItemIcon}>{<QuestionAnswerIcon color={'primary'} />}</ListItemIcon>
								<ListItemText primary="Frequently Asked Questions" />
							</ListItemButton>
						</ListItem>
					</List>
				</CardContent>
			</Card>
		</div>
	);
}
