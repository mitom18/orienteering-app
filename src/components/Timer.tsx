import React, { useCallback, useEffect, useState } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { makeStyles, Typography } from "@material-ui/core";
import { formatTime } from "../utils";

interface Props {
    start: Date;
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
        const milliseconds = Date.now() - start.getTime();
        setTime(formatTime(milliseconds));
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
