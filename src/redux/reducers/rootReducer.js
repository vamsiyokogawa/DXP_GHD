import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import commonReducer from "./commonReducer";
import loginReducer from "./loginReducer";
import contentReducer from "./contentReducer";
import templatesReducer from "./templatesReducer";
import dashboardsReducer from "./dashboardsReducer";
import formBuilderReducer from "./formBuilderReducer";
import formTemplatesReducer from "./formTemplatesReducer";

const rootReducer = combineReducers({
    toastr: toastrReducer,
    commonReducer,
    loginReducer,
    contentReducer,
    templatesReducer,
    dashboardsReducer,
    formBuilderReducer,
    formTemplatesReducer
});

export default rootReducer;
