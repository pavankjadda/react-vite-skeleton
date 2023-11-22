import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useQuery } from '@tanstack/react-query';
import { BookService } from '../../../services/BookService';

export default function BreadCrumbs(): JSX.Element {
	const { data } = useQuery({
		queryKey: ['books'],
		queryFn: () => BookService.getAllBooks(),
	});

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
				{homeMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to="/">
						Home
					</Link>
				)}
				{faqMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to="/faq">
						Faq
					</Link>
				)}
				{profileMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to="/profile">
						Profile
					</Link>
				)}
				{bookMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to="/book">
						Book
					</Link>
				)}
				{booksAllMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to="/book/all">
						All
					</Link>
				)}
				{bookFindMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to="/book/find">
						Find
					</Link>
				)}
				{bookViewMatches && (
					<Link underline="hover" color="inherit" component={RouterLink} to={`/book/${bookViewMatches.params.id}`}>
						{data?.find((book) => book.id.toString() === bookViewMatches.params.id)?.id}
					</Link>
				)}
			</Breadcrumbs>
		</>
	);
}
