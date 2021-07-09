import {
    EVT_FORM_TEMPLATES_DELETION,
    EVT_FORM_TEMPLATES_NEW_ADDITION,
    EVT_FORM_TEMPLATES_SAVE_TEMPLATES,
    EVT_FORM_TEMPLATES_SET_FROM_LOGIN,
} from "../actions/formTemplate.actions.types";
const initialState = {
    formTemplates: [],
};

const formTemplatesReducer = function (state = initialState, { type, value }) {
    switch (type) {
        case EVT_FORM_TEMPLATES_SET_FROM_LOGIN:
            // localStorage.setItem("templates", JSON.stringify(value));
            return {
                ...state,
                formTemplates: value,
            };

        case EVT_FORM_TEMPLATES_NEW_ADDITION: {
            const { formTemplates } = state;
            const { id, name, template } = value;
            formTemplates.push({
                name,
                template,
                id,
            });

            return {
                ...state,
                formTemplates,
            };
        }

        case EVT_FORM_TEMPLATES_SAVE_TEMPLATES:
            // localStorage.removeItem("templates");
            console.log(state)
            // localStorage.setItem("templates", JSON.stringify(state.templates));
            return state;

        case EVT_FORM_TEMPLATES_DELETION: {
            const { formTemplates } = state;
            const index = formTemplates.findIndex((item) => item.id === value);
            formTemplates.splice(index, 1);

            return { ...state, formTemplates };
        }

        default:
            return state;
    }
};

export default formTemplatesReducer;
