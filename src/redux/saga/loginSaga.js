import { put, call } from "redux-saga/effects";
import * as Constants from "../../constants/Constants.js";
import {
    formatTemplatesFromLoginData,
    setAuthenticationTokenHeaders,
} from "../../constants/Utils.js";
import loginInfoService from "../../services/loginInfoService.js";
import loginService from "../../services/loginService.js";
import { EVT_TEMPLATES_SET_FROM_LOGIN } from "../actions/template.actions.types.js";

export function* loginSaga({ value }) {
    try {
        yield put({ type: Constants.EVT_SHOW_LOADER });
        const response = yield call(loginService, value);
        if (response && response.status === 200) {
            setAuthenticationTokenHeaders(response.data.access_token);

            const loginInfoResponse = yield call(
                loginInfoService,
                value.username,
                response.data
            );

            if (loginInfoResponse && loginInfoResponse.status === 200) {
                const { templates, datasource, tenants, role } =
                    loginInfoResponse.data;
                const dashboards = {};

                const templatesList = formatTemplatesFromLoginData(
                    templates,
                    dashboards
                );

                // savings dashboards
                yield put({
                    type: Constants.EVT_DASHBOARDS_SET_ON_LOAD,
                    value: dashboards,
                });

                // saving tenants information with data sources
                yield put({
                    type: Constants.EVT_COMMON_SET_TENANTS_FROM_LOGIN,
                    value: tenants || [],
                });

                yield put({
                    type: Constants.EVT_COMMON_SET_DATA_SOURCES_FROM_LOGIN,
                    value: datasource || [],
                });

                // Saving Navigation information
                // yield put({
                //     type: Constants.EVT_SET_NAVIGATIONS_FROM_LOGIN,
                //     value: menuList,
                // });

                if (tenants.length) {
                    //get navigations for first tenant
                    yield put({
                        type: Constants.EVT_GET_MENU_ON_TENANT_CHANGE,
                        value: { tenantcode: tenants[0].tenantcode, RoleName: role},
                    });
                }

                // Saving Templates information
                yield put({
                    type: EVT_TEMPLATES_SET_FROM_LOGIN,
                    value: templatesList,
                });

                // Saving login information
                yield put({
                    type: Constants.EVT_LOGIN_ON_LOGIN_SUCCESS,
                    value: { ...response.data, ...value },
                });
            } else {
                alert("Login Info failed!! " + loginInfoResponse.status);
            }
        } else {
            alert("Login failed!! " + response.status);
        }
    } catch (error) {
        alert(error);
    } finally {
        yield put({ type: Constants.EVT_HIDE_LOADER });
    }
}
