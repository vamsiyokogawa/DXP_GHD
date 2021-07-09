import axios from "axios";

const roleService = (params) => {
    let data = {};
    if (params.request) {
        data = JSON.stringify(params.request);
    }
    let config = {
        method: "post",
        url: params.url,
        headers: {
            "Content-Type": "application/json",
            Authorization: "BEARER " + params.access_token,
        },
        data: data,
    };
    return axios(config).catch((error) => {
        if (axios.isCancel(error)) {
            console.error(error);
        } else {
            throw error;
        }
    });
};

export default roleService;
