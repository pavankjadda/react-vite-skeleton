import React, {useEffect, useState} from "react";
import "./Login.scss";
import {useHistory, useLocation} from "react-router-dom";
import {Grid, TextField, Typography} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import useCookies from "@js-smart/react-cookie-service";
import {resetReduxStore} from "../../../state/reducers/RootReducer";
import {LoadingButton} from "@mui/lab";
import {UpdateState} from "../../shared/UpdateState";
import {ERROR, SUCCESS} from "../../../constants/StateConstants";
import {LoginService} from "../../../services/LoginService";
import {HTTP_200, HTTP_403, HTTP_500} from "../../../constants/HttpConstants";
import {ROLE_CRMS_CORE_USER} from "../../../constants/AuthorityConstants";
import {createUser} from "../../../state/reducers/UserReducer";
import {LocationType} from "../../../types/LocationType";
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

interface LoginFormInput {
    username: string;
    password: string;
}

const schema = Yup.object({
    username: Yup.string().max(40, 'Must be 40 characters or less').required('User name is Required'),
    password: Yup.string().max(40, 'Must be 40 characters or less').required('Password is Required'),
});

export default function LoginForm(): JSX.Element {
    const [loadingState, setLoadingState] = useState<UpdateState>({loading: false, status: undefined, message: ""});
    const {getCookie, setCookie, deleteAllCookies} = useCookies();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<LocationType>();
    const {
        control,
        formState: {errors},
        handleSubmit,
    } = useForm<LoginFormInput>({
        resolver: yupResolver(schema),
        mode: 'all',
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
     * @param data LoginFormInput data
     *
     * @author Pavan Kumar Jadda
     * @since 0.1.0
     */
    const loginUser: SubmitHandler<LoginFormInput> = (data) => {
        setLoadingState(loadingState => ({
            ...loadingState,
            loading: true
        }));

        LoginService.loginUser(
            data.username,
            data.password
        ).then(response => {
            setLoadingState(loadingState => ({
                ...loadingState,
                loading: false
            }));

            //Login Success
            if (response?.status === HTTP_200) {
                //Check if user has proper roles to log in to the system
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
        <form onSubmit={handleSubmit(loginUser)} noValidate>
            <Typography
                component="div"
                variant="h4"
                className="custom-head-primary custom-flex-justify-center"
                style={{margin: '20px', fontWeight: 'bold'}}>
                Login
            </Typography>

            {/* Username */}
            <Grid container className="custom-flex-justify-center" style={{padding: '20px'}}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({field}) => (
                        <TextField
                            fullWidth
                            id="username"
                            label="Username"
                            variant="filled"
                            placeholder="Use your NIH Username"
                            error={errors.username !== undefined}
                            helperText={errors.username && errors.username.message}
                            {...field}
                            required
                        />
                    )}
                />
            </Grid>

            {/* Password */}
            <Grid container className="custom-flex-justify-center" style={{padding: '20px'}}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({field}) => (
                        <TextField
                            fullWidth
                            type="password"
                            id="password"
                            label="Password"
                            variant="filled"
                            placeholder="Use your NIH Password"
                            error={errors.password !== undefined}
                            helperText={errors.password && errors.password.message}
                            {...field}
                            required
                        />
                    )}
                />
            </Grid>

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
