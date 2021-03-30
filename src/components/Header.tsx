import { Container, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
    return {
        headerImageWrapper: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(2),
            justifyContent: "center",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        headerImage: {
            maxWidth: "100%",
            maxHeight: 80,
        },
        "@media (min-width: 600px)": {
            headerImage: {
                maxHeight: 150,
            },
        },
    };
});

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <Container component="header" maxWidth="sm">
            <Paper className={classes.headerImageWrapper}>
                <img
                    className={classes.headerImage}
                    src="/logoHeader.png"
                    alt="Jižní Supi logo"
                />
            </Paper>
        </Container>
    );
};

export default Header;
