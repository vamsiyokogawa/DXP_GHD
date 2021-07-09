import {
    EVT_TEMPLATES_DELETION,
    EVT_TEMPLATES_NEW_ADDITION,
    EVT_TEMPLATES_SAVE_TEMPLATES,
    EVT_TEMPLATES_SET_FROM_LOGIN,
} from "./template.actions.types";

export const setTemplatesOnLoad = (templates) => ({
    type: EVT_TEMPLATES_SET_FROM_LOGIN,
    value: templates,
});

export const addNewTemplate = (value) => ({
    type: EVT_TEMPLATES_NEW_ADDITION,
    value,
});

export const saveTemplatesStructure = () => ({
    type: EVT_TEMPLATES_SAVE_TEMPLATES,
});

export const deleteTemplate = (id) => ({
    type: EVT_TEMPLATES_DELETION,
    value: id,
});
