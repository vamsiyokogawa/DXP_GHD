import axios from "axios";

const loginService = async (params) => {
    let qs = require("qs");
    let data = qs.stringify({
        UserName: params.username,
        Password: params.password,
        grant_type: params.grantType,
    });
    let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/token`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data,
    };

    return await axios(config)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            alert(error);
        });
};

export default loginService;
