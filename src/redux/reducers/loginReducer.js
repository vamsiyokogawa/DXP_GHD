import * as Constants from "../../constants/Constants";

const initialState = {
    access_token: null,
    isLogged: false,
    loggedInUser: {},
    isAdmin: false,
};

const loginReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case Constants.EVT_LOGIN_ON_LOGIN_SUCCESS:
        return {
                ...state,
                isLogged: true,
                loggedInUser: {
                    user_name: value.username,
                    role: value.role,
                },
                access_token: value.access_token,
                isAdmin: (typeof value.role == 'string' && value.role.toLowerCase().indexOf("admin") > -1) ? true : false,
            };
        case Constants.EVT_LOGOUT:
            return { ...state, isLogged: false, access_token: null };

        default:
            return state;
    }
};

export default loginReducer;
