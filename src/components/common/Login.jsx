import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import * as Constants from "../../constants/Constants.js";
import Logo2 from "../../assets/logo2.png";

const Login = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const isLogged = useSelector((state) => state.loginReducer.isLogged);

    const [userName, setUserName] = useState(Constants.username);
    const [password, setPassword] = useState(Constants.password);

    useEffect(() => {
        if (isLogged) {
            history.push("/home");
        } else {
            history.push("/");
        }
    }, [isLogged]);

    const onSubmit = (e)=>{
        e.preventDefault();
        dispatch({
            type: Constants.EVT_LOGIN_ON_LOGIN,
            value: {
                username: userName.trim(),
                password: password.trim(),
                grantType: Constants.grantType,
            },
        });
    }


    // const onLoginClick = () => {
        
    //     dispatch({
    //         type: Constants.EVT_LOGIN_ON_LOGIN,
    //         value: {
    //             username: userName.trim(),
    //             password: password.trim(),
    //             grantType: Constants.grantType,
    //         },
    //     });
    // };

    return (
        <div className="login_container">
            <div className="login_inner">
            <div className="login_header">
                <img src={Logo2} alt="" className="logo" />
                <div className="logo_name">Energy Dashboard</div>
            </div>
            <div className="login_blocks">
                <form onSubmit={onSubmit}>

                <ul className="list-group">
                    <li>
                        <input
                            type="text"
                            className="username"
                            id="username"
                            name="username"
                            placeholder="User ID"
                            maxLength="30"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </li>
                    <li>
                        <input
                            type="password"
                            className="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            maxLength="50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </li>
                    <li>
                        <button
                            type="submit"
                            id="btnLogin"
                            className="login-button"
                            onClick={onSubmit}
                            disabled={!userName && !password}
                        >
                            LOGIN
                        </button>
                    </li>
                </ul>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
