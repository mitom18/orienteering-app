import {
    Button,
    Container,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import {
    apiService,
    Solution,
    solutionService,
    userService,
} from "../services";
import { formatTime } from "../utils";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        buttons: {
            display: "flex",
            justifyContent: "center",
            marginTop: theme.spacing(2),
        },
    };
});

const Result: React.FC = () => {
    const [solution, setSolution] = useState<Solution | null>(null);
    const [position, setPosition] = useState<number | null>(null);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const solution = solutionService.getSolution();
        if (solution === null) {
            history.push("/");
            return;
        }
        setSolution(solution);
        apiService.getMyPosition().then((p) => {
            setPosition(p);
        });
    }, [history]);

    const handleBackToStart = () => {
        userService.clearUser();
        history.push("/");
    };

    return (
        <>
            <Header />
            {position && solution && solution.length && solution.sites && (
                <Container component="main" maxWidth="sm">
                    <Paper className={classes.wrapper}>
                        <Typography paragraph={true} align="center">
                            Počet vyplněných stanovišť:{" "}
                            {Object.keys(solution.sites).length}.
                        </Typography>
                        <Typography variant="h5" align="center">
                            S časem
                        </Typography>
                        <Typography variant="h3" align="center">
                            {formatTime(solution.length as number)}
                        </Typography>
                        <Typography variant="h5" align="center">
                            jste se umístili na
                        </Typography>
                        <Typography variant="h2" align="center">
                            {position}.
                        </Typography>
                        <Typography variant="h5" align="center">
                            místě, gratulujeme!
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleBackToStart}
                            >
                                Zpět na start
                            </Button>
                        </div>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default Result;
