import React, { useCallback, useEffect, useState } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { makeStyles, Typography } from "@material-ui/core";

interface Props {
    start: number;
}

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
});

const Timer: React.FC<Props> = ({ start }) => {
    const [time, setTime] = useState("");
    const classes = useStyles();

    const tick = useCallback(() => {
        const milliseconds = Date.now() - start;
        const dateObj = new Date(milliseconds);
        const hours = dateObj.getUTCHours();
        const minutes = ("0" + dateObj.getUTCMinutes()).slice(-2);
        const seconds = ("0" + dateObj.getUTCSeconds()).slice(-2);
        setTime(`${hours}:${minutes}:${seconds}`);
    }, [start]);

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div className={classes.wrapper}>
            <AccessTimeIcon />
            &nbsp;
            <Typography>{time}</Typography>
        </div>
    );
};

export default Timer;
