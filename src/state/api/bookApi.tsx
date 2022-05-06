import {BOOK_API_URL} from "../../constants/ApiConstants";
import {crmsApi} from "./CrmsApi";

export interface Book {
    id: number,
    number: string,
    title: string,
    price: number,
    isbn: string,
}

export const bookApi = crmsApi.injectEndpoints({
    endpoints: (build) => ({
        getBooks: build.query<Book[], void>({
            query: () => {
                return BOOK_API_URL + '/find/all/slim';
            },
            extraOptions: {maxRetries: 6},
        })
    }),
});

export const {useGetBooksQuery} = bookApi;
