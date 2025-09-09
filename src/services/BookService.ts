import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API_URL, BOOK_API_URL } from '../constants/ApiConstants';
import { Book } from '../types/Book';

/**
 * Utility class for Books operations
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const useGetAllBooks = () =>
	useQuery({
		queryKey: ['books'],
		queryFn: () => axios.get<Book[]>(`${BASE_API_URL + BOOK_API_URL}/books`).then((response) => response.data),
	});
