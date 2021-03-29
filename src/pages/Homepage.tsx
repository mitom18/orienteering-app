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
import { solutionService, userService } from "../services";

interface FormData {
    name: string;
    age: number | string;
    email: string;
    submitted: boolean;
}

type Errors = {
    [key in keyof FormData]: string;
};

const useStyles = makeStyles((theme) => {
    return {
        container: {
            textAlign: "center",
        },
        formWrapper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        emailInfo: {
            fontSize: "0.85rem",
        },
        submitBtn: {
            marginTop: theme.spacing(2),
        },
    };
});

const Homepage: React.FC = () => {
    const [values, setValues] = useState({
        name: "",
        age: "",
        email: "",
        submitted: false,
    } as FormData);
    const [errors, setErrors] = useState({} as Errors);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        const savedUser = userService.getUser();
        if (savedUser !== null) {
            setValues({ ...savedUser, submitted: false });
        }
        solutionService.clearSolution();
    }, []);

    const validateForm = () => {
        let errors = {} as Errors;
        let isValid = true;

        if (!values.name) {
            isValid = false;
            errors.name = "Vyplňte prosím svoje jméno.";
        }

        if (!values.age) {
            isValid = false;
            errors.age = "Vyplňte prosím svůj věk.";
        }

        if (!values.email) {
            isValid = false;
            errors.email = "Vyplňte prosím svoji e-mailovou adresu.";
        } else {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(values.email)) {
                isValid = false;
                errors.email = "Vyplňte prosím platnou e-mailovou adresu.";
            }
        }

        setErrors(errors);

        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const { name, value } = e.target;
        setValues((values: FormData) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValues((values: FormData) => ({
            ...values,
            submitted: true,
        }));
        if (validateForm()) {
            const { name, age, email } = values;
            userService.saveUser({
                name,
                age: age as number,
                email,
            });
            history.push("/confirm");
        }
    };

    return (
        <>
            <Header />
            <Container
                className={classes.container}
                component="main"
                maxWidth="sm"
            >
                <Paper className={classes.formWrapper}>
                    <Typography align="left" paragraph={true}>
                        Vítáme Vás Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Voluptas obcaecati possimus quis ullam
                        corporis. Qui nobis similique repudiandae expedita
                        nostrum maiores tempore delectus voluptas perspiciatis
                        dolorum eos ab, odio iste?
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="none"
                            value={values.name}
                            fullWidth
                            id="name"
                            label="Jméno"
                            name="name"
                            required
                            error={
                                values.submitted && errors.name !== undefined
                            }
                            helperText={errors.name}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={values.age}
                            fullWidth
                            name="age"
                            label="Věk"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                },
                            }}
                            required
                            error={values.submitted && errors.age !== undefined}
                            helperText={errors.age}
                            onChange={handleChange}
                        />
                        <Typography
                            className={classes.emailInfo}
                            align="left"
                            color="textSecondary"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perferendis dolore modi obcaecati velit quis
                            nulla esse! Tempora sint nesciunt id fuga ex ea, at
                            enim officiis tenetur totam necessitatibus veniam.
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            fullWidth
                            name="email"
                            label="E-mail"
                            type="email"
                            required
                            error={
                                values.submitted && errors.email !== undefined
                            }
                            helperText={errors.email}
                            onChange={handleChange}
                        />
                        <Button
                            className={classes.submitBtn}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Přihlásit
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Homepage;
