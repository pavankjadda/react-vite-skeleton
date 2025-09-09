import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { useGetAllBooks } from '../../../services/BookService';

export default function BreadCrumbs(): React.JSX.Element {
	const { data } = useGetAllBooks();
	const { pathname } = useLocation();
	const homeMatches = matchPath('/*', pathname) || matchPath('/home', pathname);
	const faqMatches = matchPath('/faq', pathname);
	const profileMatches = matchPath('/profile', pathname);
	const bookMatches = matchPath('/book/*', pathname);
	const booksAllMatches = matchPath('/book/all', pathname);
	const bookViewMatches = matchPath('/book/:id', pathname);
	const bookFindMatches = matchPath('/book/find', pathname);

	return (
		<>
			<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
				{homeMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to="/">
						Home
					</Link>
				) : null}
				{faqMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to="/faq">
						Faq
					</Link>
				) : null}
				{profileMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to="/profile">
						Profile
					</Link>
				) : null}
				{bookMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to="/book">
						Book
					</Link>
				) : null}
				{booksAllMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to="/book/all">
						All
					</Link>
				) : null}
				{bookFindMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to="/book/find">
						Find
					</Link>
				) : null}
				{bookViewMatches ? (
					<Link underline="hover" color="inherit" component={RouterLink} to={`/book/${bookViewMatches.params.id}`}>
						{data?.find((book) => book.id.toString() === bookViewMatches.params.id)?.id}
					</Link>
				) : null}
			</Breadcrumbs>
		</>
	);
}
