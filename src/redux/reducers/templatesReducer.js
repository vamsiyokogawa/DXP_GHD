import {
    EVT_TEMPLATES_DELETION,
    EVT_TEMPLATES_NEW_ADDITION,
    EVT_TEMPLATES_SAVE_TEMPLATES,
    EVT_TEMPLATES_SET_FROM_LOGIN,
} from "../actions/template.actions.types";

const initialState = {
    templates: [],
};

const templatesReducer = function (state = initialState, { type, value }) {
    switch (type) {
        case EVT_TEMPLATES_SET_FROM_LOGIN:
            localStorage.setItem("templates", JSON.stringify(value));
            return {
                ...state,
                templates: value,
            };

        case EVT_TEMPLATES_NEW_ADDITION: {
            const { templates } = state;
            const { id, name } = value;
            templates.push({
                name,
                id,
            });

            return {
                ...state,
                templates,
            };
        }

        case EVT_TEMPLATES_SAVE_TEMPLATES:
            localStorage.removeItem("templates");
            console.log(state)
            localStorage.setItem("templates", JSON.stringify(state.templates));
            return state;

        case EVT_TEMPLATES_DELETION: {
            const { templates } = state;
            const index = templates.findIndex((item) => item.id === value);
            templates.splice(index, 1);

            return { ...state, templates };
        }

        default:
            return state;
    }
};

export default templatesReducer;
