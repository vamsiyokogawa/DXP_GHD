import axios from "axios";

const saveTemplate = async ({ template, role, tenantcode }) => {
    const data = JSON.stringify({
        RoleName: role,
        TenantName: tenantcode,
        TemplateName: template.name,
        TemplateJson: template.dashboard,
    });
    const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/Energy/SaveTemplate`,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    };

    return axios(config);
};

export default saveTemplate;
