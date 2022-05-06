import React, {useEffect, useState} from "react";
import "./Login.scss";
import {useHistory, useLocation} from "react-router-dom";
import {Divider, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {useCookies} from "@react-smart/react-cookie-service";
import {resetReduxStore} from "../../../state/reducers/RootReducer";
import {LoadingButton} from "@mui/lab";
import {UpdateState} from "../../shared/UpdateState";
import {ERROR, SUCCESS} from "../../../constants/StateConstants";
import {LoginService} from "../../../services/LoginService";
import {HTTP_200, HTTP_403, HTTP_500} from "../../../constants/HttpConstants";
import {ROLE_CRMS_CORE_USER} from "../../../constants/AuthorityConstants";
import {createUser} from "../../../state/reducers/UserReducer";
import {LocationType} from "../../../types/LocationType";

export default function LoginForm(): JSX.Element {
    const [loadingState, setLoadingState] = useState<UpdateState>({loading: false, status: undefined, message: ""});
    const {getCookie, setCookie, deleteAllCookies} = useCookies();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<LocationType>();

    /**
     * Initialize Formik instance and setup validation schema
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(40, "Must be 40 characters or less")
                .required("User name is Required"),
            password: Yup.string()
                .max(40, "Must be 40 characters or less")
                .required("Password is Required")
        }),
        onSubmit: (values) => {
            //Login user and save token
            loginUser(values?.username, values?.password);
        }
    });

    /**
     * Save Redirect URL and clear all cookies on load. Set `redirectUrl` again
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    useEffect(() => {
        const redirectUrl = location?.state?.from?.pathname as string ?? getCookie("redirectUrl");
        deleteAllCookies();
        dispatch(resetReduxStore());
        setCookie("redirectUrl", redirectUrl);
    }, []);

    /**
     * Login user and save token to cookies
     *
     * @param username of the user
     * @param password of the user
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    function loginUser(username: string, password: string) {
        setLoadingState(loadingState => ({
            ...loadingState,
            loading: true
        }));

        LoginService.loginUser(
            username,
            password
        ).then(response => {
            setLoadingState(loadingState => ({
                ...loadingState,
                loading: false
            }));

            //Login Success
            if (response?.status === HTTP_200) {
                //Check if user has proper roles to login to the system
                if (response.data.authorities.find(authority => authority.name === ROLE_CRMS_CORE_USER) === undefined) {
                    setLoadingState({
                        loading: false,
                        status: ERROR,
                        message: "Login unsuccessful. You are not authorized to login into CRA Skeleton App. Please contact support"
                    });
                } else {
                    setLoadingState(loadingState => ({
                        ...loadingState,
                        loading: false,
                        status: SUCCESS
                    }));
                    //Set Cookies and update Redux state
                    setCookie("X-Auth-Token", response.data.token);
                    setCookie("currentUser", JSON.stringify(response.data));
                    setCookie("isLoggedIn", "true");

                    //Update user in State
                    dispatch(createUser(response.data));

                    // Navigate to previous page or home page
                    history.push((getCookie("redirectUrl") === undefined || getCookie("redirectUrl") === "/login") ? "/home" : getCookie("redirectUrl"));
                }
            }
        })
            .catch((error) => {
                setLoadingState({loading: false, status: ERROR, message: ""});
                //Set error status and message
                if (error?.response?.status === HTTP_403)
                    setLoadingState(loadingState => ({
                        ...loadingState,
                        loading: false,
                        status: ERROR,
                        message: "Login unsuccessful. You are not authorized to login into CRA Skeleton App. Please contact support"
                    }));
                else if (error?.response?.status >= HTTP_500)
                    setLoadingState(loadingState => ({
                        ...loadingState,
                        loading: false,
                        status: ERROR,
                        message: "Login unsuccessful.  Unable to contact the server, please try again after few minutes"
                    }));
                else
                    setLoadingState(loadingState => ({
                        ...loadingState,
                        loading: false,
                        status: ERROR,
                        message: "Login unsuccessful. " + error?.response?.data
                    }));
            });
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <h2 className="custom-flex-justify-center" style={{padding: "10px"}}>
                    Login
                </h2>
            </div>
            <Divider/>
            <div className=" custom-flex-justify-center" style={{padding: "20px"}}>
                <TextField
                    id="username"
                    label="Username"
                    variant="filled"
                    placeholder="Use your NIH Username"
                    {...formik.getFieldProps("username")}
                    required
                />
            </div>
            {formik.touched.username && formik.errors.username && (
                <div className="row custom-flex-justify-center">
                    <label className="col-xs-12 col-sm-12 com-md-12 col-lg-10 col-xl-8 text-danger"
                           style={{paddingLeft: "20px"}}>
                        {formik.errors.username}
                    </label>
                </div>
            )}

            <div className="row custom-flex-justify-center" style={{padding: "20px"}}>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    placeholder="Use your NIH Password"
                    {...formik.getFieldProps("password")}
                    required
                />
            </div>
            {formik.touched.password && formik.errors.password && (
                <div className="row custom-flex-justify-center">
                    <label className="col-xs-12 col-sm-12 com-md-12 col-lg-10 col-xl-8 text-danger"
                           style={{paddingLeft: "20px"}}>
                        {formik.errors.password}
                    </label>
                </div>
            )}

            {/* Submit button */}
            <div className="custom-flex-justify-center" style={{padding: "20px"}}>
                <LoadingButton
                    style={{minWidth: "200px"}}
                    type="submit"
                    loading={loadingState.loading}
                    loadingPosition={"center"}
                    color="primary"
                    variant="contained"
                    className="mx-auto"
                >
                    Login
                </LoadingButton>

            </div>
            {/* Loading Error */}
            <div className="row" style={{padding: "20px"}}>
                {!loadingState.loading && loadingState.status === ERROR && (
                    <h6 style={{color: "red"}}>{loadingState.message}</h6>)}
            </div>
        </form>
    );
}
