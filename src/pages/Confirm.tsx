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
    Category,
    categoryService,
    solutionService,
    User,
    userService,
} from "../services";

const useStyles = makeStyles((theme) => {
    return {
        mainWrapper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        buttons: {
            display: "flex",
            justifyContent: "space-between",
        },
    };
});

const Confirm: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const savedUser = userService.getUser();
        if (savedUser === null) {
            history.push("/");
            return;
        }
        setUser(savedUser);
        setCategory(categoryService.getCategory(savedUser.age));
    }, [history]);

    const handleBack = () => {
        history.push("/");
    };

    const handleStart = () => {
        solutionService.saveSolution({ start: new Date() });
        history.push("/solution");
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="sm">
                <Paper className={classes.mainWrapper}>
                    <Typography variant="subtitle1" gutterBottom>
                        {user
                            ? `Jste přihlášeni jako ${user.name} (${user.email}).`
                            : "Nejste přihlášeni."}
                    </Typography>
                    {user && category && (
                        <Typography paragraph={true}>
                            Vyplnili jste věk {user.age}, tedy spadáte do
                            kategorie {category.name}. Tato kategorie musí během
                            našeho orienťáku navštívit {category.sitesCount}{" "}
                            stanovišť. Jste připraveni začít?
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
