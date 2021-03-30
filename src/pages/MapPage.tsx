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

const useStyles = makeStyles({});

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
            <p>{category && category.mapPath}</p>
            <BottomNav />
        </>
    );
};

export default MapPage;
