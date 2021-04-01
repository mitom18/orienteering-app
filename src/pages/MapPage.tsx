import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import {
    userService,
    solutionService,
    Category,
    categoryService,
} from "../services";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            maxWidth: "100%",
            overflow: "auto",
            textAlign: "center",
            marginBottom: theme.spacing(6),
        },
    };
});

const MapPage: React.FC = () => {
    const [category, setCategory] = useState<Category | null>(null);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const user = userService.getUser();
        if (user === null) {
            history.push("/");
            return;
        }

        const solution = solutionService.getSolution();
        if (solution === null || solution.end !== undefined) {
            history.push("/");
            return;
        }

        setCategory(categoryService.getCategory(user.age));
    }, [history]);

    return (
        <>
            <main className={classes.wrapper}>
                {category && category.mapPath && (
                    <img src={category.mapPath} alt="Mapa" />
                )}
            </main>
            <BottomNav />
        </>
    );
};

export default MapPage;
