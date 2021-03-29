import {
    BottomNavigation,
    BottomNavigationAction,
    makeStyles,
} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MapIcon from "@material-ui/icons/Map";
import React from "react";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => {
    return {
        bottomNavigation: {
            width: "100%",
            position: "fixed",
            bottom: 0,
            zIndex: 90,
            borderTopColor: theme.palette.primary.main,
            borderTopWidth: 2,
            borderTopStyle: "solid",
        },
    };
});

const BottomNav: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    return (
        <BottomNavigation
            className={classes.bottomNavigation}
            value={location.pathname}
            onChange={(event, newValue) => {
                history.push(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction
                label="Řešení"
                value="/solution"
                icon={<ListAltIcon />}
            />
            <BottomNavigationAction
                label="Mapa"
                value="/map"
                icon={<MapIcon />}
            />
        </BottomNavigation>
    );
};

export default BottomNav;
