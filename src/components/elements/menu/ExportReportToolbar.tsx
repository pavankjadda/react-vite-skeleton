import * as React from 'react';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { exportToExcelSheet, ReportsConfigProps } from '../../../utils/ExcelUtil';
import ExcelButton from '../buttons/ExcelButton';

export function ExportReportToolbar(props: { reportsConfig: ReportsConfigProps }) {
	const apiRef = useGridApiContext();
	return (
		<GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
			<ExcelButton onClick={() => exportToExcelSheet(apiRef, props.reportsConfig)}>Excel</ExcelButton>
		</GridToolbarContainer>
	);
}
