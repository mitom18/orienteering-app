import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { deepOrange, orange } from "@material-ui/core/colors";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Confirm from "./pages/Confirm";
import Homepage from "./pages/Homepage";
import MapPage from "./pages/MapPage";
import Result from "./pages/Result";
import Solution from "./pages/Solution";

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: deepOrange,
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/confirm">
                        <Confirm />
                    </Route>
                    <Route exact path="/map">
                        <MapPage />
                    </Route>
                    <Route exact path="/solution">
                        <Solution />
                    </Route>
                    <Route exact path="/result">
                        <Result />
                    </Route>
                    <Route path="/">
                        <Homepage />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
