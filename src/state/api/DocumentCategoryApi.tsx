import {BOOK_CATEGORY_API_URL} from "../../constants/ApiConstants";
import {crmsApi} from "./CrmsApi";

export interface DocumentCategory {
    id: number,
    name: string
}
export const documentCategoryApi = crmsApi.injectEndpoints({
    endpoints: (build) => ({
        getDocumentCategories: build.query<DocumentCategory[], void>({
            query: () => {
                return BOOK_CATEGORY_API_URL + '/find/all';
            },
            extraOptions: {maxRetries: 6},
        })
    }),
});

export const {useGetDocumentCategoriesQuery} = documentCategoryApi;
