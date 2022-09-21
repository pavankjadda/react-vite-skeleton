import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import useCookies from "@js-smart/react-cookie-service";

const { getCookie } = useCookies();

export const crmsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers) => {
            // Get X-Auth-Token cookie and set it to headers
            headers.set("X-Auth-Token", getCookie("X-Auth-Token"));
            return headers;
        },
    }),
    endpoints: () => ({}),
});
