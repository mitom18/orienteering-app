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
import {
    apiService,
    Solution,
    solutionService,
    User,
    userService,
} from "../services";

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

const Feedback: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [solution, setSolution] = useState<Solution | null>(null);
    const [feedback, setFeedback] = useState("");
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const user = userService.getUser();
        const solution = solutionService.getSolution();
        const apiId = apiService.getApiId();
        if (user === null || solution === null || apiId !== null) {
            history.push("/");
            return;
        }
        setUser(user);
        setSolution(solution);
    }, [history]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const { value } = e.target;
        setFeedback(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user && solution) {
            await apiService.save(user, solution, feedback);
        }
        history.push("/result");
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="sm">
                <Paper className={classes.wrapper}>
                    <Typography paragraph={true}>
                        Líbil se Vám orienťák? Nenašli jste některé stanoviště?
                        Dejte nám vědět!
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Pokračovat
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Feedback;
