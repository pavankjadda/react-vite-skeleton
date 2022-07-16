import React, {useEffect, useState} from "react";
import BookTile from "./book-tile/BookTile";
import HelpTile from "./help-tile/HelpTile";
import {HomeService} from "../../services/HomeService";
import {UpdateState} from "../shared/UpdateState";
import {UpdateStateUtils} from "../../util/UpdateStateUtils";
import {ERROR, SUCCESS} from "../../constants/StateConstants";
import {useDispatch} from "react-redux";
import {updateUser} from "../../state/reducers/UserReducer";
import ReactIf from "../shared/ReactIf";
import {Alert} from "@mui/material";
import useCookies from "@js-smart/react-cookie-service";

export default function Home(): JSX.Element {
    const [loadingState, setLoadingState] = useState<UpdateState>({loading: false, status: undefined, message: ""});
    const {setCookie} = useCookies();
    const dispatch = useDispatch();

    /**
     * Get user information. This validates existing session and gets updated user information
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    useEffect(() => {
        UpdateStateUtils.startLoadingOrUpdating(loadingState);
        HomeService.getUserInformation()
            .then(response => {
                setLoadingState({loading: false, status: SUCCESS, message: ""});
                dispatch(updateUser(response.data));
                setCookie("currentUser", JSON.stringify(response.data));
            })
            .catch((error) => {
                setLoadingState({
                    loading: false,
                    status: SUCCESS,
                    message: "An error occurred while loading the documents. Error: " + error
                });
            });
    }, []);


    return (
        <div className="container-fluid">
            {/* Alert block */}
            <ReactIf condition={!loadingState.loading && loadingState.status === ERROR}>
                <div className="row">
                    <Alert className="custom-flex-justify-center" severity="error">
                        {loadingState.message}
                    </Alert>
                </div>
            </ReactIf>

            <BookTile/>
            <HelpTile/>
        </div>
    );
}
