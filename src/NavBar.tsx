import React, { useState, useRef } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/ForwardOutlined";

import Link from "./Link";

const useStyles = makeStyles(() => ({
  logo: {
    height: "56px",
    padding: "5px",
  },
  search: {
    backgroundColor: "rgba(255,255,255, 0.1)",
    borderRadius: 4,
    flexBasis: 330,
    height: 36,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: "8px",
    color: "inherit",
  },
  searchButton: {
    marginLeft: "4px",
    color: "inherit",
  },
  searchInput: {
    flexGrow: 1,
    color: "inherit",
    "& input::placeholder": {
      opacity: 1,
      color: "inherit",
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
  };

  const handleNotificationsOpen = () => {
    window.location.href = "/pokemon?search=" + searchValue;
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Pokemon"
            title="pokemon"
            className={classes.logo}
          />
        </Link>
        <div className={classes.flexGrow} />
        <div className={classes.search} ref={searchRef}>
          <SearchIcon className={classes.searchIcon} />
          <Input
            className={classes.searchInput}
            disableUnderline
            onChange={handleSearchChange}
            placeholder="Search by pokemon id &amp; name"
            value={searchValue}
          />
          <IconButton
            className={classes.searchButton}
            onClick={handleNotificationsOpen}
            size="small"
          >
            <NotificationsIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
