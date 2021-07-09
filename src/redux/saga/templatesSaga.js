import { put, call } from "redux-saga/effects";
import { toastr } from "react-redux-toastr";
import store from "../store";
import saveTemplate from "../../services/templateService.js";
import * as Constants from "../../constants/Constants.js";

export function* saveTemplateDataSaga() {
    // Showing loader while saving template
    yield put({ type: Constants.EVT_SHOW_LOADER });

    const {
        templatesReducer: { templates },
        dashboardsReducer: { dashboards, selectedDashboardId },
        loginReducer: {
            loggedInUser: { role },
        },
        commonReducer: {
            selectedTenant: { tenantcode },
        },
    } = store.getState();
    console.log(store.getState())
    const selectedTemplate = templates.find(
        (item) => item.id === selectedDashboardId
    );
    const template = {
        name: selectedTemplate.name,
        dashboard: dashboards[selectedDashboardId],
    };

    if (template) {
        try {
            const response = yield call(saveTemplate, {
                template,
                role,
                tenantcode,
            });

            if (response && response.status === 200) {
                toastr.success(
                    "Success",
                    `${template.name} details saved successfully`
                );
            } else {
                toastr.error(
                    "Failed",
                    "Failes to save the template details, please try again!!!"
                );
            }
        } catch {
            toastr.error(
                "Failed",
                "Failes to save the template details, please try again!!!"
            );
        }
    }

    // Hide loader once template save done
    yield put({ type: Constants.EVT_HIDE_LOADER });
}
