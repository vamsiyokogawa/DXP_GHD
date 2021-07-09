import {
    EVT_FORM_TEMPLATES_DELETION,
    EVT_FORM_TEMPLATES_NEW_ADDITION,
    EVT_FORM_TEMPLATES_SAVE_TEMPLATES,
    EVT_FORM_TEMPLATES_SET_FROM_LOGIN,
} from "./formTemplate.actions.types";

export const setTemplatesOnLoad = (templates) => ({
    type: EVT_FORM_TEMPLATES_SET_FROM_LOGIN,
    value: templates,
});

export const addNewTemplate = (value) => ({
    type: EVT_FORM_TEMPLATES_NEW_ADDITION,
    value,
});

export const saveTemplatesStructure = () => ({
    type: EVT_FORM_TEMPLATES_SAVE_TEMPLATES,
});

export const deleteTemplate = (id) => ({
    type: EVT_FORM_TEMPLATES_DELETION,
    value: id,
});
