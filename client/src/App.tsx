import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Home from "./pages/Pages/Home";
import Login from "./pages/Pages/Login";
import { ForgotPassword } from "./pages/Pages/forgotpassword";
import { ChangePassword } from "./pages/Pages/ChangePassword";
import { useMeQuery } from "./generated/graphql";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
    const [{ data, fetching }] = useMeQuery();

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/" Component={App}>
                        <Route
                            path="/change-password/:tokenId"
                            component={ChangePassword}
                        ></Route>
                        <Route path="/rooms/:roomId" component={Home}></Route>
                        <Route
                            path="/forgotpassword"
                            component={ForgotPassword}
                        ></Route>

                        <Route path="/login" component={Login}></Route>
                        <Route path="/home" component={Home}></Route>

                        {fetching ? (
                            <h1>Grabbing user</h1>
                        ) : data ? (
                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return data.me ? (
                                        <Redirect to="/home" />
                                    ) : (
                                        <Redirect to="/login" />
                                    );
                                }}
                            ></Route>
                        ) : null}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
export default App;
