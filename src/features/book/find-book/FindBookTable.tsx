import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery } from '../../../state/api/bookApi';
import { isUndefinedOrNullOrEmpty } from '../../../util/StringUtils';

export default function FindBookTable(props: { searchText: string }) {
	let { data: books, isLoading } = useGetBooksQuery();
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const filteredBooks = useMemo(() => {
		return isUndefinedOrNullOrEmpty(props.searchText)
			? books
			: books?.filter((row) => {
					return Object.keys(row).some((field) => {
						// @ts-ignore
						return row[field] == null ? false : new RegExp(props.searchText, 'i').test(row[field].toString());
					});
			  });
	}, [props.searchText, isLoading]);

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<div style={{ flexGrow: 1 }}>
				<DataGrid
					loading={isLoading}
					rows={filteredBooks ?? []}
					columns={columns}
					autoHeight={true}
					page={page}
					onPageChange={(newPage) => setPage(newPage)}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					pageSize={pageSize}
					rowsPerPageOptions={[10, 20, 50, 100]}
					disableSelectionOnClick
				/>
			</div>
		</div>
	);
}

/**
 * Table Columns
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		flex: 1,
		renderCell: (params: GridCellParams) => <Link to={'/book/' + params.row['id']}>{params.row['id']}</Link>,
	},
	{ field: 'title', headerName: 'Title', flex: 2.5 },
	{ field: 'isbn', headerName: 'ISBN', flex: 2.5 },
	{ field: 'author', headerName: 'Author', flex: 2.5 },
];
