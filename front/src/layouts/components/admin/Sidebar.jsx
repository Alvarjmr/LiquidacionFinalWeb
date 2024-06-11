import React from "react";
import "./Sidebar.css";
import "./Panel.css";
import { Outlet, Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const Sidebar = () => {
  var showCreateNewEmploy = false;

  try {
   
    var userString = localStorage.getItem("userFirebase");
    var userJson = JSON.parse(userString);
    showCreateNewEmploy = userJson?.is_admin;

  } catch (error) {}

  return (
    <div className="flex">
      <div className="sidebar">
        <ul>
          <li className={showCreateNewEmploy ? "enable-menu" : "disable-menu"}>
            <ListItemButton
              sx={{ marginTop: 2 }}
              component={Link}
              to={`/crearempledos`}
            >
              <ListItemIcon>
                <PersonAddAltIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "black" }}
                primary={"Crear Empleados"}
              />
            </ListItemButton>
          </li>

          <li>
            <ListItemButton
              sx={{ marginTop: 2 }}
              component={Link}
              to={`/completo`}
            >
              <ListItemIcon>
                {" "}
                <DateRangeIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "black" }}
                primary={"Liquidar tiempo Completo"}
              />
            </ListItemButton>
          </li>

          <li>
            <ListItemButton
              sx={{ marginTop: 2 }}
              component={Link}
              to={`/xdias`}
            >
              <ListItemIcon>
                <HistoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "black" }}
                primary={"Liquidar tiempo dias"}
              />
            </ListItemButton>
          </li>
          <li>
            <ListItemButton sx={{ marginTop: 2 }} component={Link} to={`/`}>
              <ListItemIcon>
                <CloseIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "black" }} primary={"Salir"} />
            </ListItemButton>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
