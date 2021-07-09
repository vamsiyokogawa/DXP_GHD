import * as Constants from "../../constants/Constants";
import { getSelectedNavigation, removeNavigation } from "../../constants/Utils";

const initialState = {
    navigations: [],
    isOpenConfig: false,
    selectedWidget: null,
    breadcrumb: [],
};

const contentReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case Constants.EVT_SET_NAVIGATIONS_FROM_LOGIN:
            return { ...state, navigations: value };

        case Constants.EVT_ADD_NAVIGATION:
            if (value.parent_id) {
                let parentNavigation = getSelectedNavigation(
                    state.navigations,
                    value.parent_id
                );
                parentNavigation.children.push(value);
            } else {
                state.navigations.push(value);
            }
            return state;

        case Constants.EVT_DELETE_NAVIGATION:
            state.navigations = [...removeNavigation(state.navigations, value)];
            return state;

        case Constants.EVT_OPEN_CONFIG:
            state.selectedWidget = value;
            state.isOpenConfig = !state.isOpenConfig;
            return state;

        case Constants.EVT_SET_NAVIGATIONS_BREADCRUMB:
            return { ...state, breadcrumb: value };

        default:
            return state;
    }
};

export default contentReducer;
