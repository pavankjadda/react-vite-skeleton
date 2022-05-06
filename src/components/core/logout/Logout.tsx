import "../login/Login.scss";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useCookies } from "@react-smart/react-cookie-service";

export default function Logout(): JSX.Element {
    const history = useHistory();
    const { deleteCookie, deleteAllCookies } = useCookies();

    /**
     * Remove cookies and redirect user to Login page
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    useEffect(() => {
        deleteCookie("redirectUrl");
        deleteAllCookies();

        // Programmatically navigate to login page
        history.push("/login");
    });

    return (
      <div>
          <h3>Please wait while we logout...</h3>
      </div>
    );
}
