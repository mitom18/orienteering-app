import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => {
    return {
        mainWrapper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
    };
});

const Result: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Container component="main" maxWidth="sm">
                <Paper className={classes.mainWrapper}>
                    <Typography paragraph={true}>
                        TODO text a formulář se zpětnou vazbou / vysvětlením,
                        proč bylo zadáno méně stanovišť apod.
                    </Typography>
                </Paper>
            </Container>
        </>
    );
};

export default Result;
