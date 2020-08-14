import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStateValue } from "../../contextApi/StateProvider";
import { auth } from "../../config/firebase";
import { actionTypes } from "../../contextApi/reducer";
function Header() {
  const [{ user }, dispatch] = useStateValue();

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </div>
      <div className="header__right">
        <ExitToAppIcon onClick={signOut} className="header__rightLogout" />
        <HelpOutlineOutlinedIcon />
      </div>
    </div>
  );
}

export default Header;
