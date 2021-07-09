import axios from "axios";

export async function saveNavigations({ navigations, role, tenantcode }) {
    const data = JSON.stringify({
        RoleName: role,
        TenantName: tenantcode,
        Menu: navigations,
    });
    const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/Energy/SaveMenu`,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    };

    return await axios(config);
}

export async function getNavigations(tenantcode, RoleName) {
    const data = JSON.stringify({
        tenantcode,
        RoleName
    });
    const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/Energy/GetMenuForTenants`,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    };

    return await axios(config);
}
