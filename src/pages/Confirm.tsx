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
import { solutionService, User, userService } from "../services";

const useStyles = makeStyles({
    mainWrapper: {
        padding: 16,
        marginBottom: 12,
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
    },
});

const Confirm: React.FC = () => {
    const [user, setUser] = useState({} as User);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const savedUser = userService.getUser();
        if (savedUser === null) {
            history.push("/");
            return;
        }
        setUser(savedUser);
    }, [history]);

    const handleBack = () => {
        history.push("/");
    };

    const handleStart = () => {
        solutionService.saveSolution({ start: Date.now() });
        history.push("/solution");
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="sm">
                <Paper className={classes.mainWrapper}>
                    <Typography paragraph={true}>
                        {user
                            ? `Jste přihlášeni jako ${user.name} (${user.email})`
                            : "Nejste přihlášeni."}
                    </Typography>
                    {user && (
                        <Typography paragraph={true}>
                            Vyplnili jste věk {user.age}, tedy spadáte do
                            kategorie XX. Tato kategorie musí během našeho
                            orienťáku navštívit XX stanovišť. Jste připraveni
                            začít?
                        </Typography>
                    )}
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleBack}
                        >
                            Zpět
                        </Button>
                        {user && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleStart}
                            >
                                Start
                            </Button>
                        )}
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default Confirm;
