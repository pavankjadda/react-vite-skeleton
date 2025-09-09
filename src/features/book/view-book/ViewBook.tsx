import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, Grid, Paper } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetAllBooks } from '../../../services/BookService';

function ViewBook() {
	const { id } = useParams();
	const { data } = useGetAllBooks();
	const book = data?.find((b) => b?.id.toString() === id);

	return (
		<Grid container className="app-flex-justify-center" style={{ height: 'auto', width: '100%' }}>
			<Grid size={{ xs: 12, sm: 12, md: 12, lg: 11, xl: 11 }}>
				<Paper elevation={24} sx={{ m: 3, p: 3 }}>
					<h2 className={'app-flex-justify-center'}>View Book</h2>
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
