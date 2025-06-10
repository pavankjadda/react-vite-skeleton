import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';

export default function ReportsTile(): React.JSX.Element {
	return (
		<div style={{ marginTop: '50px' }}>
			<Card className="container-fluid col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8" elevation={24}>
				<h3 className="app-flex-justify-center" style={{ marginTop: '20px' }}>
					<EqualizerIcon style={{ marginRight: '10px' }} />
					Reports
				</h3>
				<Divider style={{ borderBlockEnd: '1px solid black' }} />
				<CardContent className="row app-flex-justify-center">
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon className="listItemIcon">{<PieChartIcon color={'primary'} />}</ListItemIcon>
								<ListItemText primary="Quarterly Review" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon className="listItemIcon">{<PivotTableChartIcon color={'primary'} />}</ListItemIcon>
								<ListItemText primary="Annual Review" />
							</ListItemButton>
						</ListItem>
					</List>
				</CardContent>
			</Card>
		</div>
	);
}
