import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useCookies } from "@react-smart/react-cookie-service";
import { User } from "../../user/User";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ProfileMenu() {
  const history = useHistory();
  const { check, getCookie } = useCookies();
  const [user] = useState<User | undefined>(check("currentUser") ? JSON.parse(getCookie("currentUser")) as User : undefined);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="profile-button"
        aria-controls="profile-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        endIcon={<ArrowDropDownIcon />}
      >
        {user?.firstName + " " + user?.lastName}

      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button"
        }}
      >
        <MenuItem onClick={() => history.push("/profile")}>
          <PersonIcon style={{ marginRight: "10px" }} />
          Profile
        </MenuItem>
        <MenuItem onClick={() => history.push("/logout")}>
          <Logout style={{ marginRight: "10px" }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
    );
}

