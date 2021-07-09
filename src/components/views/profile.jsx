import {
    Card,
    CardContent,
    Paper,
    makeStyles,
    FormControl,
    TextField,
    Grid,
    Button
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Navigations from "../common/Navigations";
import "./styles/common.css";
import store from "../../redux/store";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        backgroundColor: theme.palette.bg.sidebar,
    },
    mainContainer: {
        background: theme.palette.bg.container,
	    paddingLeft: "7px",
	    paddingRight: "7px",
    },
}));

const Profile = () => {
    const classes = useStyles();

    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    let { loginReducer: { loggedInUser: {user_name, role} }} = store.getState();
    
    const [oldPassword, setOldPassword] = useState();
    const [oldPasswordError, setOldPasswordError] = useState(null);
    const [newPassword, setNewPassword] = useState();
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const onChangeText = (event, stateKey) => {
        switch (stateKey) {
            case 'oldPassword':
                setOldPassword(event.target.value);
                break;
            case 'newPassword':
                setNewPassword(event.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(event.target.value);
                break;
            default:
                break;
        }   
    }


    return (
        <Paper style={{ height: "100%", width: "100%" }}>
            <div className="app-container">
                <Header />
                <div className="app-content-container">
                    <div
                        className={
                            classes.sidebar +
                            (showSidebar
                                ? " app-nav-container"
                                : " app-nav-container-hide")
                        }>
                        <Card style={{ height: "100%" }}>
                            <CardContent>
                                <Navigations />
                            </CardContent>
                        </Card>
                    </div>
                    <div
                        className={
                            classes.mainContainer + " app-workarea-container"
                        }>
                        <div className="app-control-panel-container">
                            <h2>Profile</h2>
                        </div>
                        <div className="scrollable-container">
                            <Paper 
                                variant="outlined">
                                <Grid
                                    spacing={1}
                                    xs={6}>
                                    <FormControl
                                        className={classes.formControlChartDataSource}
                                        margin='normal'>
                                        <p>{user_name}</p>
                                    </FormControl>
                                </Grid>
                                
                                <Grid
                                    spacing={1}
                                    xs={6}>
                                    <FormControl
                                        className={classes.formControlChartDataSource}
                                        margin='normal'>
                                        <p>{role}</p>
                                    </FormControl>
                                </Grid>

                                <Grid
                                    spacing={1}
                                    xs={6}>
                                    <FormControl
                                        className={classes.formControlChartDataSource}
                                        margin='normal'>
                                        <TextField
                                            value={oldPassword}
                                            fullWidth
                                            id="standard-required-units"
                                            label="Old Password"
                                            onChange={(event) => onChangeText(event, 'oldPassword')}
                                            variant="outlined"
                                            error={(oldPasswordError !== null)}
                                            helperText={oldPasswordError}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    spacing={1}
                                    xs={6}>
                                    <FormControl
                                        className={classes.formControlChartDataSource}
                                        margin='normal'>
                                        <TextField
                                            value={newPassword}
                                            fullWidth
                                            id="standard-required-units"
                                            label="New Password"
                                            onChange={(event) => onChangeText(event, 'newPassword')}
                                            variant="outlined"
                                            error={(newPasswordError !== null)}
                                            helperText={newPasswordError}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    spacing={1}
                                    xs={6}>
                                    <FormControl
                                        fullWidth
                                        className={classes.formControlChartDataSource}
                                        margin='normal'>
                                        <TextField
                                            value={confirmPassword}
                                            fullWidth
                                            id="standard-required-units"
                                            label="Confimr New Password"
                                            onChange={(event) => onChangeText(event, 'confirmPassword')}
                                            variant="outlined"
                                            error={(confirmPasswordError !== null)}
                                            helperText={confirmPasswordError}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    spacing={3}
                                    xs={6}>
                                    <FormControl
                                        required
                                        className={classes.formControlChartDataSource}
                                        margin='normal'>
                                        <Button
                                            variant="contained"
                                             color="secondary"
                                            size='large'>
                                            Update Password
                                        </Button>
                                    </FormControl>
                                </Grid>

                            </Paper>

                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default Profile;
