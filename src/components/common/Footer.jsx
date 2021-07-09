import "./css/Footer.css";

import React from "react";
import { useTheme } from "@material-ui/core";

function Footer() {
    const theme = useTheme();
    return (
        <div
            className="app-footer-container"
            style={{
                backgroundColor:
                    theme.palette.bg.footer,
                color:
                    theme.palette.color.footer,
            }}
        >
            <p className="footer-text">
                Copyright © 1997-2020 Yokogawa Electric Corporation
            </p>
        </div>
    );
}

export default Footer;
