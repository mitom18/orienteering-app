import {
    AppBar,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Paper,
    TextField,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom";
import {
    categoryService,
    Sites,
    solutionService,
    User,
    userService,
} from "../services";
import Timer from "../components/Timer";
import BottomNav from "../components/BottomNav";

const useStyles = makeStyles((theme) => {
    return {
        topAppBar: {
            zIndex: 90,
        },
        toolbarTopAppBar: {
            maxWidth: 600,
        },
        titleTopAppBar: {
            flexGrow: 1,
        },
        mainWrapper: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(8),
        },
        field: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    };
});

const Solution: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [siteNames, setSiteNames] = useState([] as string[]);
    const [sites, setSites] = useState<Sites | null>(null);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const savedUser = userService.getUser();
        if (savedUser === null) {
            history.push("/");
            return;
        }
        setUser(savedUser);

        const solution = solutionService.getSolution();
        if (solution === null || solution.end !== undefined) {
            history.push("/");
            return;
        }
    }, [history]);

    useEffect(() => {
        if (user) {
            const category = categoryService.getCategory(user.age);
            const siteNames = categoryService.getSiteNames(category);
            const solution = solutionService.getSolution();
            const savedSites = (solution && solution.sites) || {};
            setSiteNames(siteNames);
            setSites(
                siteNames
                    .map((s) => {
                        return { [s]: savedSites[s] || undefined };
                    })
                    .reduce((res, cur) => {
                        return Object.assign(res, cur);
                    }, {})
            );
        }
    }, [user]);

    useEffect(() => {}, [siteNames]);

    const getStart = (): Date | null => {
        const solution = solutionService.getSolution();
        if (solution === null || solution.start === undefined) {
            history.push("/");
            return null;
        }
        return new Date(solution.start);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        if (sites) {
            const { name, value } = e.target;
            sites[name] = parseInt(value);
            setSites(sites);
            solutionService.saveSolution({
                start: getStart() || new Date(),
                sites: sites || undefined,
            });
        }
    };

    const handleOnSuccess = (start: Date, end: Date) => {
        solutionService.saveSolution({
            start,
            end,
            length: end.getTime() - start.getTime(),
            sites: sites || undefined,
        });
        history.push("/feedback");
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        const start = getStart();
        if (!start) {
            return;
        }
        const end = new Date();

        if (!user || !sites) {
            return;
        }

        const category = categoryService.getCategory(user.age);
        const expectedSites = categoryService.getSiteNames(category);
        const filledSites = Object.values(sites).filter((i) => i !== undefined);
        const missingSitesCount = expectedSites.length - filledSites.length;
        if (missingSitesCount) {
            confirmAlert({
                customUI: ({ onClose }) => (
                    <Dialog
                        open={true}
                        onClose={onClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Opravdu?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Nevyplnili jste {missingSitesCount} stanovišť.
                                Přesto chcete odeslat formulář?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    onClose();
                                    handleOnSuccess(start, end);
                                }}
                                color="primary"
                            >
                                Ano
                            </Button>
                            <Button onClick={onClose} color="primary" autoFocus>
                                Ne
                            </Button>
                        </DialogActions>
                    </Dialog>
                ),
            });
        } else {
            handleOnSuccess(start, end);
        }
    };

    return (
        <>
            <AppBar position="sticky" className={classes.topAppBar}>
                <Container component="header" maxWidth="sm">
                    <Toolbar className={classes.toolbarTopAppBar}>
                        <Typography
                            variant="h6"
                            className={classes.titleTopAppBar}
                        >
                            <Timer start={getStart() || new Date()} />
                        </Typography>
                        <Button color="inherit" onClick={handleSubmit}>
                            Odeslat
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container component="main" maxWidth="sm">
                <Paper className={classes.mainWrapper}>
                    <form noValidate autoComplete="off">
                        {sites &&
                            Object.keys(sites).map((name) => (
                                <TextField
                                    key={name}
                                    value={sites[name]}
                                    className={classes.field}
                                    variant="outlined"
                                    margin="none"
                                    fullWidth
                                    id={name}
                                    name={name}
                                    label={name}
                                    type="number"
                                    onChange={handleChange}
                                />
                            ))}
                    </form>
                </Paper>
            </Container>
            <BottomNav />
        </>
    );
};

export default Solution;
