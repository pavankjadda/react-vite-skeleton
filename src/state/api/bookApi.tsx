import { BOOK_API_URL } from '../../constants/ApiConstants';
import { crmsApi } from './crmsApi';
import { Book } from '../../types/Book';

export const bookApi = crmsApi.injectEndpoints({
	endpoints: (build) => ({
		getBooks: build.query<Book[], void>({
			query: () => {
				return BOOK_API_URL + '/find/all/slim';
			},
			extraOptions: { maxRetries: 6 },
		}),
	}),
});

export const { useGetBooksQuery } = bookApi;
