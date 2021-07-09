import axios from "axios";

const loginInfoService = async (userName, params) => {
    const data = JSON.stringify({ LoginID: userName });
    
    let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/Energy/Login`,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    };

    return await axios(config);
};

export default loginInfoService;
