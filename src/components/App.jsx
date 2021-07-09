import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/core";
import * as Constants from "../constants/Constants";
import { darkTheme, lightTheme, blackTheme } from "./themes/theme";
import "./App.css";
import Loader from "./common/Loader";

import Login from "./common/Login";
import Home from "./common/Home";
import Templates from "./views/templates";
import Roles from "./views/roles";
import Users from "./views/users";
import DataSources from "./views/datasource_management";
import Tenants from "./views/tenants";
import Profile from "./views/profile";
import RoleMenuMapping from "./views/RoleMenuMapping";

const history = createBrowserHistory({ basename: "/" });

function App() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.commonReducer.darkMode);

    history.listen((location) => {
        dispatch({
            type: Constants.EVT_COMMON_PATH_CHANGE,
            value: location.pathname,
        });
    });
    
    return (
        <React.Suspense fallback={<Loader loader={true} />}>
            <Router history={history}>
                <ThemeProvider theme={(darkMode === 'dark') ? blackTheme  :(darkMode === 'white')? lightTheme: darkTheme }>
                    <Switch>
                        <Route path="/" exact component={Login}></Route>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/templates" component={Templates}></Route>
                        <Route path="/roles" component={Roles}></Route>
                        <Route path="/users" component={Users}></Route>
                        <Route
                            path="/datasources"
                            component={DataSources}
                        ></Route>
                        <Route path="/tenants" component={Tenants}></Route>
                        <Route path="/profile" component={Profile}></Route>
                        <Route path="/role-mapping" component={RoleMenuMapping}></Route>
                    </Switch>
                </ThemeProvider>
            </Router>
            <Loader />
        </React.Suspense>
    );
}

export default App;
