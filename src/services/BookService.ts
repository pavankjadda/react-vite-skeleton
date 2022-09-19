import axios from 'axios';
import { BOOK_API_URL } from '../constants/ApiConstants';
import { Book } from '../types/Book';

/**
 * Utility class for Books operations
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export class BookService {
	/**
	 * Get All Books
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	static getAllBooks(): Promise<Book[]> {
		return axios.get<Book[]>(import.meta.env.VITE_REACT_APP_BASE_URL + BOOK_API_URL + '/all').then((response) => response.data);
	}
}
