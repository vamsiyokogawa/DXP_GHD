import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
        <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
        />
    </Provider>,
    // </React.StrictMode>
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
