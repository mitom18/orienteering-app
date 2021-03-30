import {
    Button,
    Container,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import { Solution, solutionService } from "../services";
import { formatTime } from "../utils";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        buttons: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
        },
    };
});

const Result: React.FC = () => {
    const [solution, setSolution] = useState<Solution | null>(null);
    const [feedback, setFeedback] = useState("");
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const solution = solutionService.getSolution();
        if (solution === null) {
            history.push("/");
            return;
        }
        setSolution(solution);
    }, [history]);

    // TODO find out in which place the user finished

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const { value } = e.target;
        setFeedback(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO save feedback
        history.push("/");
    };

    const handleBackToStart = () => {
        history.push("/");
    };

    return (
        <>
            <Header />
            {solution && solution.length && (
                <Container component="main" maxWidth="sm">
                    <Paper className={classes.wrapper}>
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
                            1.
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom>
                            místě, gratulujeme!
                        </Typography>
                    </Paper>
                    <Paper className={classes.wrapper}>
                        <Typography paragraph={true}>
                            Líbil se Vám orienťák? Nenašli jste některé
                            stanoviště? Dejte nám vědět!
                        </Typography>
                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="none"
                                fullWidth
                                value={feedback}
                                id="feedback"
                                name="feedback"
                                label="Zpětná vazba"
                                multiline
                                rows={4}
                                onChange={handleChange}
                            />
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleBackToStart}
                                >
                                    Zpět na start
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Odeslat
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default Result;
