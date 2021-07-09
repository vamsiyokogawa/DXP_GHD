import { takeEvery } from "redux-saga/effects";
import * as Constants from "../../constants/Constants.js";
import { EVT_TEMPLATES_SAVE_TEMPLATES } from "../actions/template.actions.types.js";
import { loginSaga } from "./loginSaga.js";
import { getNavigationsForTenant, saveNavigationsDataSaga } from "./navigationSaga.js";
import { saveTemplateDataSaga } from "./templatesSaga.js";

export function* rootSaga() {
    yield takeEvery(Constants.EVT_LOGIN_ON_LOGIN, loginSaga);
    yield takeEvery(EVT_TEMPLATES_SAVE_TEMPLATES, saveTemplateDataSaga);
    yield takeEvery(Constants.EVT_SAVE_NAVITIONS_SAGA, saveNavigationsDataSaga);
    yield takeEvery(
        Constants.EVT_GET_MENU_ON_TENANT_CHANGE,
        getNavigationsForTenant
    );
}
