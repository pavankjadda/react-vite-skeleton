import "./App.scss";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import axios from "axios";
import SideBarContainer from "./components/layout/side-bar/SideBarContainer";
import { HTTP_401 } from "./constants/HttpConstants";
import { useNavigate, useLocation } from "react-router-dom";
import useCookies from "@js-smart/react-cookie-service";

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCookie, setCookie, deleteAllCookies } = useCookies();

  /**
   * HTTP Request interceptor that adds X-Auth-Token for each request
   *
   * @author Pavan Kumar Jadda
   * @since 1.0.0
   */
  axios.interceptors.request.use(
      (request) => {
        // @ts-ignore
        request.headers["X-Auth-Token"] = getCookie("X-Auth-Token");
        request.withCredentials = true; //Adds X-XSRF-TOKEN to headers only when request is POST
        return request;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
  );

  /**
   * HTTP Response interceptor that captures HTTP 401 error from Response and Redirect user to Login page
   *
   * @author Pavan Kumar Jadda
   * @since 1.0.0
   */
  axios.interceptors.response.use(
      response => {
        // @ts-ignore
        axios.defaults.headers.post["X-XSRF-TOKEN"] = response;
        return response;
      },
      error => {
        if (error?.response?.status === HTTP_401) {
          deleteAllCookies();
          setCookie("redirectUrl", location?.pathname ?? "/");

          // Programmatically navigate to login page
            navigate("/login");
        }
        return Promise.reject(error);
      }
  );
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBarContainer />
      </ThemeProvider>
  );
}
