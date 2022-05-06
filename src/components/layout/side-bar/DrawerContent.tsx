import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import HelpIcon from "@mui/icons-material/Help";
import styles from "./SideBar.module.scss";


/**
 * Define Side Bar content in a string
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
function DrawerContent(): JSX.Element {
    const history = useHistory();

    /**
     * Programmatically navigate to Home
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    function navigateToHome() {
        history.push("/home");
    }

    /**
     * Programmatically navigate to Book Search
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    function navigateToBookSearch() {
        history.push("/book");
    }

    return (<div>
        <div className={styles.drawerContainer}>
            <h5 className={styles.banner}>CRA Skeleton App</h5>
            <Divider className={styles.divider} />

            {/* Book Section */}
            <List style={{ marginTop: "20px" }}>
                {/* Home */}
                <ListItem button key="Home" onClick={navigateToHome}>
                    <ListItemIcon className={styles.listItemIcon}>{<HomeIcon />}</ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                {/* Find Book */}
                <ListItem button key="Book Search" onClick={navigateToBookSearch}>
                    <ListItemIcon className={styles.listItemIcon}>{<SearchIcon />}</ListItemIcon>
                    <ListItemText primary="Find Book" />
                </ListItem>
            </List>
            <Divider />

            <Divider className={styles.divider} />
            {/* Help Section */}
            <List>

                {/* Help */}
                <ListItem button key="Home" onClick={navigateToHome}>
                    <ListItemIcon className={styles.listItemIcon}>{<HelpIcon />}</ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItem>

                {/* Version */}
                <ListItem key="Version">
                    <label>Version: {process.env.REACT_APP_VERSION}</label>
                </ListItem>
            </List>
        </div>
    </div>);
}

export default DrawerContent;
