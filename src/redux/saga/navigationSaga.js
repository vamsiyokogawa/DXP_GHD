import { put, call } from "redux-saga/effects";
import { toastr } from "react-redux-toastr";
import store from "../store";
import * as Constants from "../../constants/Constants.js";
import {
    getNavigations,
    saveNavigations,
} from "../../services/navigationService";
import { formatMenuFromLoginData } from "../../constants/Utils";

const attachDashboardToMenu = (navigations, dashboards) => {
    return navigations.map((item) => {
        const name = item.name;
        const dashboard = JSON.stringify(dashboards[item.id]);
        let children = [];
        if (item.children && item.children.length) {
            children = attachDashboardToMenu(item.children, dashboards);
        }

        return { name, dashboard, children };
    });
};

export function* saveNavigationsDataSaga() {
    // Showing loader while saving Menu
    yield put({ type: Constants.EVT_SHOW_LOADER });

    let {
        contentReducer: { navigations },
        dashboardsReducer: { dashboards },
        loginReducer: {
            loggedInUser: { role },
        },
        commonReducer: {
            selectedTenant: { tenantcode },
        },
    } = store.getState();

    const navigationsForSave = attachDashboardToMenu(navigations, dashboards);

    try {
        const response = yield call(saveNavigations, {
            navigations: navigationsForSave,
            role,
            tenantcode,
        });

        if (response && response.status === 200) {
            toastr.success("Success", `Menu details updated successfully`);
        } else {
            toastr.error(
                "Failed",
                "Failed to save the Menu details, please try again!!!"
            );
        }
    } catch {
        toastr.error(
            "Failed",
            "Failed to save the Menu details, please try again!!!"
        );
    }

    // Hide loader once Menu save done
    yield put({ type: Constants.EVT_HIDE_LOADER });
}

export function* getNavigationsForTenant({ value }) {
    const { tenantcode, RoleName } = value;

    // Showing loader while saving Menu
    yield put({ type: Constants.EVT_SHOW_LOADER });

    try {
        const response = yield call(getNavigations, tenantcode, RoleName);

        if (response && response.status === 200) {
            const { data } = response;
            const menus = data.map((item) => item.Menu);
            const dashboards = {};
            const menuList = formatMenuFromLoginData(menus, dashboards);

            // Add Dashboards to store
            yield put({
                type: Constants.EVT_DASHBOARDS_SET_ON_MENU_LOAD,
                value: dashboards,
            });

            // Saving Navigation information
            yield put({
                type: Constants.EVT_SET_NAVIGATIONS_FROM_LOGIN,
                value: menuList,
            });
        }
    } catch {
        toastr.error(
            "Failed",
            "Failed to get the Menu details, please try again!!!"
        );
    }

    // Hide loader once Menu save done
    yield put({ type: Constants.EVT_HIDE_LOADER });
}
