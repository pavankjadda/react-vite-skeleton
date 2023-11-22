import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { isUndefinedOrNullOrEmpty } from '../../../util/StringUtils';
import { useQuery } from '@tanstack/react-query';
import { BookService } from '../../../services/BookService';

export default function FindBookTable(props: { searchText: string }) {
	const { data: books, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => BookService.getAllBooks(),
	});

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
					initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
					getRowId={(row) => row.id}
					pageSizeOptions={[10, 20, 50, 100]}
					disableRowSelectionOnClick={true}
					density={'comfortable'}
					loading={isLoading}
					rows={filteredBooks ?? []}
					columns={columns}
					autoHeight={true}
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
