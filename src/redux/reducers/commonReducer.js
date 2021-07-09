import * as Constants from "../../constants/Constants";

const initialState = {
    path: false,
    tenants: [],
    dataSources: [],
    selectedTenant: null,
    showSidebar:false,
    loader: false,
    darkMode: 'dark',
    theme: "dark",
};

const commonReducer = function (state = initialState, { type, value }) {
    switch (type) {
        case Constants.EVT_COMMON_PATH_CHANGE:

            return { ...state, path: value };

        case Constants.EVT_COMMON_SET_TENANTS_FROM_LOGIN:
            return { ...state, tenants: value, selectedTenant: value[0] };

        case Constants.EVT_COMMON_SET_DATA_SOURCES_FROM_LOGIN:
            return { ...state, dataSources: value };

        case Constants.EVT_COMMON_SET_SELECTED_TENANT:
            return { ...state, selectedTenant: value };

        case Constants.EVT_SHOW_SIDEBAR:
            return { ...state, showSidebar: value };

        case Constants.EVT_SHOW_LOADER:
            return { ...state, loader: true };

        case Constants.EVT_HIDE_LOADER:
            return { ...state, loader: false };

        case Constants.EVT_COMMON_CHANGE_THEME:
            return {
                ...state,
                darkMode: value,
                theme: value ? "dark" : "blue",
            };

        default:
            return state;
    }
};

export default commonReducer;
