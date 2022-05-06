import React from "react";
import { Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import styles from "../../layout/side-bar/SideBar.module.scss";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useHistory } from "react-router-dom";
import FindInPageIcon from "@mui/icons-material/FindInPage";

export default function BookTile() {
    const history = useHistory();
    return (
      <div style={{ marginTop: "20px" }}>
          <Card className="container-fluid col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8" elevation={24}>
              <h3 className="custom-flex-justify-center" style={{ marginTop: "20px" }}>
                  Book
              </h3>
              <Divider style={{ borderBlockEnd: "1px solid black" }} />
                <CardContent className="row custom-flex-justify-center">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => history.push("/book")}>
                                <ListItemIcon className={styles.listItemIcon}>
                                    {<FindInPageIcon color={"primary"}/>}
                                </ListItemIcon>
                                <ListItemText primary="Find Book"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => history.push("/book/all")}>
                                <ListItemIcon className={styles.listItemIcon}>
                                    {<FormatListBulletedIcon color={"primary"}/>}
                                </ListItemIcon>
                                <ListItemText primary="See All Books"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </div>
    )
        ;
}
