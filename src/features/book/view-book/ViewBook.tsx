import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid, Paper } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useQuery } from '@tanstack/react-query';
import { BookService } from '../../../services/BookService';

function ViewBook() {
	let { id } = useParams();
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['books'],
		queryFn: () => BookService.getAllBooks(),
	});
	
	const book = data?.find((b) => b?.id.toString() === id);

	return (
		<Grid container className="custom-flex-justify-center" style={{ height: 'auto', width: '100%' }}>
			<Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
				<Paper elevation={24} sx={{ m: 3, p: 3 }}>
					<h2 className={'custom-flex-justify-center'}>View Book</h2>
					<hr />
					<p>
						<b>ID</b>: {book?.id}
					</p>
					<p>
						<b>Title</b>: {book?.title}
					</p>
					<p>
						<b>ISBN</b>: {book?.isbn}
					</p>
					<p>
						<b>Author</b>: {book?.author}
					</p>

					<br />
					<Link to={'/book/all'}>
						<Button variant="contained">
							<ChevronLeftIcon />
							View All Books
						</Button>
					</Link>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default ViewBook;
