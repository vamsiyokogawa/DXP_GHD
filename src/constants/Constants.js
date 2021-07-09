import { uuid } from "uuidv4";

//export const username = "admin";
//export const password = "Password";
export const username = "";
export const password = "";

export const grantType = "password";

export const EVT_COMMON_PATH_CHANGE = "PATH_CHANGE";
export const EVT_COMMON_SET_TENANTS_FROM_LOGIN =
    "COMMON_SET_TENANTS_FROM_LOGIN";
export const EVT_COMMON_SET_DATA_SOURCES_FROM_LOGIN =
    "COMMON_SET_DATA_SOURCES_FROM_LOGIN";
export const EVT_COMMON_SET_SELECTED_TENANT = "COMMON_SET_SELECTED_TENANT";

export const EVT_LOGIN_ON_LOGIN = "LOGIN_EVENT";
export const EVT_LOGIN_ON_LOGIN_SUCCESS = "LOGIN_EVENT_SAGA";
export const EVT_LOGOUT = "LOGOUT_EVENT";
export const EVT_SET_NAVIGATIONS_FROM_LOGIN = "SET_NAVIGATIONS_FROM_LOGIN";
export const EVT_ADD_NAVIGATION = "ADD_NAVIGATION_EVENT";
export const EVT_DELETE_NAVIGATION = "DELETE_NAVIGATION";
export const EVT_OPEN_CONFIG = "OPEN_CONFIG";
export const EVT_SHOW_SIDEBAR = "SHOW_NAVIGATION";
export const EVT_SAVE_NAVITIONS_SAGA = "SAVE_NAVITIONS_SAGA";
export const EVT_SHOW_LOADER = "SHOW_LOADER";
export const EVT_HIDE_LOADER = "HIDE_LOADER";
export const EVT_COMMON_CHANGE_THEME = "COMMON_CHANGE_THEME";
export const EVT_SET_NAVIGATIONS_BREADCRUMB = "SET_NAVIGATIONS_BREADCRUMB";
export const EVT_GET_MENU_ON_TENANT_CHANGE = "GET_MENU_ON_TENANT_CHANGE";

export const EVT_DASHBOARDS_SET_ON_LOAD = "DASHBOARDS_SET_ON_LOAD";
export const EVT_DASHBOARDS_SET_ON_MENU_LOAD = "DASHBOARDS_SET_ON_MENU_LOAD";
export const EVT_DASHBOARDS_SET_SELECTED_ID = "DASHBOARDS_SET_SELECTED_ID";
export const EVT_DASHBOARDS_ON_REMOVE_WIDGET = "DASHBOARDS_ON_REMOVE_WIDGET";
export const EVT_DASHBOARDS_ON_LAYOUT_CHANGE = "DASHBOARDS_ON_LAYOUT_CHANGE";
export const EVT_DASHBOARDS_ON_ADD_WIDGET = "DASHBOARDS_ON_ADD_WIDGET";
export const EVT_DASHBOARDS_ON_UPDATE_WIDGET = "DASHBOARDS_ON_UPDATE_WIDGET";
export const EVT_DASHBOARDS_ADD_NEW_DASHBOARD = "DASHBOARDS_ADD_NEW_DASHBOARD";
export const EVT_DASHBOARDS_FILTER_WIDGET = "EVT_DASHBOARDS_FILTER_WIDGET";
export const EVT_DASHBOARDS_ON_ADD_DATASOURCE = "DASHBOARDS_ON_ADD_DATASOURCE";
export const EVT_DASHBOARDS_ON_UPDATE_DATASOURCE = "DASHBOARDS_ON_UPDATE_DATASOURCE";
export const EVT_DASHBOARDS_ON_REMOVE_DATASOURCE = "DASHBOARDS_ON_REMOVE_DATASOURCE";

export const THEMES = [
    "dark",
    "white",
    "blue",
];

export const DATE_RANGES = [
    "Today",
    "This Week",
    "This Month",
    "This Year",
    "Range",
    "1 hour",
    "2 hour",
    "3 hour",
    "6 hour",
    "8 hour",
    "12 hour",
    "24 hour",
];

export const USERS = Object.freeze({
    ADMIN_USER: { name: "Admin", role: "admin", id: "1", group: "admin" },
    ENGINEER_USER: {
        name: "Engineer",
        role: "engineer",
        id: "2",
        group: "user",
    },
    OPERATOR_USER: {
        name: "OPERATOR",
        role: "operator",
        id: "3",
        group: "user",
    },
});

export const widgets = Object.freeze({
    PIE_CHART: {
        name: "Pie Chart",
        type: "piechart",
        id: "1",
        group: "chart",
        source: "timeseries",
    },
    DONUT_CHART: {
        name: "Donut Chart",
        type: "donutchart",
        id: "21",
        group: "chart",
        source: "timeseries",
    },
    LINE_CHART: {
        name: "Line Chart",
        type: "linechart",
        id: "2",
        group: "chart",
        source: "timeseries",
    },
    //BAR_CHART: {name: "bar_chart", type: "barchart", id: "3", group: "chart", source:"timeseries"},
    GAUGE_CHART: {
        name: "Gauge Chart",
        type: "guagechart",
        id: "3",
        group: "chart",
        source: "timeseries",
    },
    GRID: {
        name: "Grid",
        type: "grid",
        id: "4",
        group: "grid",
        source: "timeseries",
    },
    // TEXT_BOX: {
    //     name: "Text Box",
    //     type: "textbox",
    //     id: "5",
    //     group: "textbox",
    //     source: "timeseries",
    // },
    LABEL: { name: "Label", type: "labeldata", id: "6", group: "label" },
    LABELURL: { name: "Label Url", type: "labelurldata", id: "17", group: "labelurl" },
    NONE: { name: "none", type: "none", id: "999", group: "none" },
    IMAGE: { name: "Image", type: "image", id: "7", group: "image" },
    HEATMAP: {
        name: "Heat Map",
        type: "heatmap",
        id: "8",
        group: "heatmap",
    },
    GOOGLEMAP: {
        name: "Google Map",
        type: "googlemap",
        id: "9",
        group: "googlemap",
    },
    MAPLABELREDIRECT: {
        name: "Label Map",
        type: "labelmap",
        id: "18",
        group: "labelmap",
    },
    // IMAGE: {name: "image", type: "image", id: "7", group: "image"},
    //LINK: {name: "link", type: "link", id: "8", group: "link"},
    BAR_CHART: {
        name: "Bar Chart",
        type: "barchart",
        id: "13",
        group: "chart",
        source: "timeseries",
    },
    MULTIPLE_AXES_CHART: {
        name: "Multiple Axes Chart",
        type: "multipleaxeschart",
        id: "10",
        group: "chart",
        source: "timeseries",
    },
    LINE_COLUMN_CHART: {
        name: "Line Column Chart",
        type: "linecolumnchart",
        id: "11",
        group: "chart",
        source: "timeseries",
    },
    /* AREA_CHART: {
        name: "Area Chart",
        type: "areachart",
        id: "12",
        group: "chart",
        source: "timeseries",
    },*/
    SCATTER_CHART: {
        name: "Scatter Chart",
        type: "scatterchart",
        id: "14",
        group: "chart",
        source: "timeseries",
    },
    THREEDPLOT_CHART: {
        name: "3D Plot Chart",
        type: "3dscatterchart",
        id: "19",
        group: "chart",
        source: "timeseries",
    },
    ANOMALY_CHART: {
        name: "Anomaly Chart",
        type: "anomalychart",
        id: "15",
        group: "chart",
        source: "timeseries",
    },
    LINE_SCATTER_CHART: {
        name: "Line Scatter Chart",
        type: "linescatterchart",
        id: "16",
        group: "chart",
        source: "random",
    },
    RUNNING_CHART: {
        name: "Running Chart",
        type: "runninggraphdata",
        id: "20",
        group: "chart",
        source: "random",
    },
    BULLET_CHART: {
        name: "Bullet Chart",
        type: "BulletChart",
        id: "22",
        group: "chart",
        source: "random",
    },
});

export const navigationType = Object.freeze({
    NODE_1: { name: "Level 1", level: 1 },
    NODE_2: { name: "Level 2", level: 2 },
    NODE_3: { name: "Level 3", level: 3 },
    NODE_4: { name: "Level 4", level: 4 },
});

export const filters = Object.freeze({
    DATE: { name: "filter by date", type: "date" },
    NAME: { name: "filter by name", type: "name" },
});

export const COLUMN_ALIGNS = {
    Center: "Center",
    Left: "Left",
    Right: "Right",
}

export const Bar_Graph_Plot_Type = {
    Horizontal: "Horizontal",
    Vertical: "Vertical",
};

export const Bar_Graph_Plot_Type_Order = {
    Ascending: "Ascending",
    Descending: "Descending",
};

export const Multiple_Yaxis_Plot_Type = {
    YAxis_right: "right",
    YAxis_left: "left",
};

export const Line_Chart_Type = {
    spline: "line",
    column: "column",
    scatter: "scatter",
};

export const getLayoutForChartWidgetById = ({ widget_id, widget_info }) => {
    if (widget_info && widget_info.group === widgets.LABEL.group) {
        return {
            w: 2,
            h: 2,
            x: 0,
            y: Infinity,
            i: widget_id,
            moved: false,
            static: false,
            minWidth: 2,
            minHeight: 2,
        };
    }
    // if (widget_info && widget_info.group === widgets.LABELREDIRECT.group) {
    //     return {
    //         w: 2,
    //         h: 2,
    //         x: 0,
    //         y: Infinity,
    //         i: widget_id,
    //         moved: false,
    //         static: false,
    //         minWidth: 2,
    //         minHeight: 2,
    //     };
    // }
    if (widget_info && widget_info.group === widgets.IMAGE.group) {
        return {
            w: 3,
            h: 4,
            x: 0,
            y: Infinity,
            i: widget_id,
            moved: false,
            static: false,
            minWidth: 2,
            minHeight: 2,
        };
    }

    return {
        w: 12,
        h: 4,
        x: 0,
        y: Infinity,
        i: widget_id,
        moved: false,
        static: false,
    };
};

export const getLayoutForChartWidgetByZeroId = (widget_id) => {
    return {
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        i: widget_id,
        moved: false,
        static: false,
    };
};

export const new_template = {
    template_id: null,
    template_name: "",
    creation_date: new Date(),
    modified_date: new Date(),
    header: {},
    footer: {},
    navigations: [],
};

export const new_header = {
    tenant_name: "Test Tenant",
    tenant_logo: {
        img_url: "http://tinyurl.com/12345",
        height: "25",
        width: "100",
        unit: "px",
    },
};

export const new_navigation = {
    name: "",
    id: "",
    count: 0,
    level: navigationType.NODE_1.level,
    parent_id: null,
    children: [],
};

export const new_widget = {
    title: "",
    units: "",
    source: null,
    type: "",
    description: "",
    dataSourceList: [],
    datasource: null,
    data_path: "",
    widget_info: null,
    widget_id: uuid(),
    tables: [],
    startDate: "",
    endDate: "",
    backgroundColor: "",
    isNewWidget: true,
    refreshInterval: null,
    xAxis: "",
    yAxis: "",
    link: "",
    dynamicText: [],
    unitPositioning: "",
    isShowTableGrid: true
};
export const new_config = {
    name: "",
    url: "",
    datasource:[]
};

export const new_table = {
    table_name: null,
    columns: [
        {
            column_name: null,
        },
    ],
    filter: [
        {
            column_name: null,
        },
    ],
};

export const template_blank = {
    user: {
        username: "test_user",
    },
    templates: [],
};

export const dataSources = {
    [widgets.LINE_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
    ],
    [widgets.GAUGE_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Gauge chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetGuageChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Gauge chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetGuageChartData`,
        },
    ],
    [widgets.GRID.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Usage Process DataTable)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetKPIDataTable`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water(Usage Process DataTable)",
            label: "Watnon Water(Usage Process DataTable)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetKPIDataTable`,
        },
        /*{
            id: 3,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Usage System DataTable)",
            url: " http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetUsageBySystemChartData"
        },
        {
            id: 4,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Usage System DataTable)",
            url: " http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetUsageBySystemChartData"
        }*/
    ],
    [widgets.PIE_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Pie chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetPieChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Pie chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetPieChartData`,
        },
    ],
    [widgets.DONUT_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Pie chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetPieChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Pie chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetPieChartData`,
        },
    ],
    // [widgets.TEXT_BOX.type]: [
    //     {
    //         id: 1,
    //         company: "Intelligent Water Networks",
    //         customer: "Barwon Water",
    //         label: "Barwon Water(Text Box)",
    //         url: `${process.env.REACT_APP_API_URL}/api/Energy/GetTextBoxData`,
    //     },
    //     {
    //         id: 2,
    //         company: "Intelligent Water Networks",
    //         customer: "Watnon Water",
    //         label: "Watnon Water(Text Box)",
    //         url: `${process.env.REACT_APP_API_URL}/api/Energy/GetTextBoxData`,
    //     },
    // ],
    [widgets.LABEL.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Label)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetLabelData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Label)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetLabelData`,
        },
    ],
    // [widgets.LABELREDIRECT.type]: [
    //     {
    //         id: 1,
    //         company: "Intelligent Water Networks",
    //         customer: "Barwon Water",
    //         label: "Barwon Water(Label)",
    //         url: `${process.env.REACT_APP_API_URL}/api/Energy/GetLabelData`,
    //     },
    //     {
    //         id: 2,
    //         company: "Intelligent Water Networks",
    //         customer: "Watnon Water",
    //         label: "Watnon Water(Label)",
    //         url: `${process.env.REACT_APP_API_URL}/api/Energy/GetLabelData`,
    //     },
    // ],
    [widgets.BAR_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Text Box)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetBarChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Text Box)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetBarChartData`,
        },
    ],
    [widgets.MULTIPLE_AXES_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
    ],
    [widgets.LINE_COLUMN_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetLineColumnChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetLineColumnChartData`,
        },
    ],
    /*[widgets.AREA_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
    ],*/
    [widgets.HEATMAP.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetHeatMapChartData`,
        },
    ],
    [widgets.SCATTER_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetScatterChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetScatterChartData`,
        },
    ],
    [widgets.THREEDPLOT_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetScatterChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Watnon Water",
            label: "Watnon Water(Line Column Chart)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetScatterChartData`,
        },
    ],
    [widgets.IMAGE.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Get Images)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetImagesList`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Upload Image)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/UploadFile`,
        },
    ],
    [widgets.ANOMALY_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Get Images)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetAnamolyData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Upload Image)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetAnamolyData`,
        },
    ],
    [widgets.LINE_SCATTER_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Get Images)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Upload Image)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetlineChartData`,
        },
    ],
    [widgets.BULLET_CHART.type]: [
        {
            id: 1,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Get Images)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetBulletGraphChartData`,
        },
        {
            id: 2,
            company: "Intelligent Water Networks",
            customer: "Barwon Water",
            label: "Barwon Water(Upload Image)",
            url: `${process.env.REACT_APP_API_URL}/api/Energy/GetBulletGraphChartData`,
        },
    ],
};
export const request_info_blank = {
    access_token: "",
    url: "",
    request: {
        info: {
            deviceName: "",
            deviceId: 1,
            dataPath: "",
            desc: "desc",
            source: "",
        },
        config: {
            type: "",
            widgetsetup: "",
            metrics: [],
        },
    },
};

export const KEY_CONSTANTS = {
    googleApiKey: "AIzaSyB68xRiWURgyPlEJnnCOC44IbUN1ya-rJI",
};

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/Energy/`;
export const API_URLS = {
    GET_ROLES_LIST: BASE_URL + "RolesList",
    GET_ROLE: BASE_URL + "GetRole",
    DELETE_ROLE: BASE_URL + "DeleteRole",
    SAVE_ROLE: BASE_URL + "SaveRole",

    GET_USERS_LIST: BASE_URL + "UsersList",
    GET_USER: BASE_URL + "GetUser",
    DELETE_USER: BASE_URL + "DeleteUser",
    SAVE_USER: BASE_URL + "SaveUser",

    GET_DATA_SOURCE_LIST: BASE_URL + "DatasourceList",
    DELETE_DATA_SOURCE: BASE_URL + "DeleteDatasource",
    GET_DATA_SOURCE: BASE_URL + "GetDatasource",
    SAVE_DATA_SOURCE: BASE_URL + "SaveDatasource",

    GET_TENANT_LIST: BASE_URL + "TenantList",
    DELETE_TENANT: BASE_URL + "DeleteTenant",
    GET_TENANT: BASE_URL + "GetTenant",
    SAVE_TENANT: BASE_URL + "SaveTenant",

    /**
     * Update Password
     */
    UPDATE_PASSWORD: BASE_URL + "",

    /**
     * Menu Mapping
     */
    GET_ROLE_MENU_MAPPING: BASE_URL + "GetRoleMenumapping",
    GET_MENU_TENANTS: BASE_URL + "GetMenuForTenants",
    SAVE_ROLE_MENU_MAPPING: BASE_URL + "SaveRoleMenumapping",
    DELETE_ROLE_MEU_MAPPING: BASE_URL + "DeleteRoleMenuMapping",
};

export const LINE_FIELD_CHART_TYPE = [
    {
        id: 1,
        type: "spline",
        name: "Line Chart"
    },
    {
        id: 2,
        type: "area",
        name: "Area Chart"
    },
];

export const GAUGE_CHART_TYPE = [
    {
        id: 1,
        type: "gauge",
        name: "Gauge Chart"
    },
    {
        id: 2,
        type: "solidgauge",
        name: "Solid Gauge Chart"
    },
];


export const IMAGE_CHART_TYPE = [
    {
        id: 1,
        type: "image",
        name: "Image Chart"
    },
    {
        id: 2,
        type: "svg",
        name: "Svg Chart"
    },
];

export const CHART_LEGEND_SETTING = [
    {
        id:1,
        title: 'Top Left',
        key: 'TOP_LEFT'
    },
    {
        id:2,
        title: 'Top Center',
        key: 'TOP_CENTER'
    },
    {
        id:3,
        title: 'Top Right',
        key: 'TOP_RIGHT'
    },
    {
        id:4,
        title: 'Middle Left',
        key: 'MIDDLE_LEFT'
    },
    {
        id:5,
        title: 'Middle Center',
        key: 'MIDDLE_CENTER'
    },
    {
        id:6,
        title: 'Middle Right',
        key: 'MIDDLE_RIGHT'
    },
    {
        id:7,
        title: 'Bottom Left',
        key: 'BOTTOM_LEFT'
    },
    {
        id:8,
        title: 'Bottom Center',
        key: 'BOTTOM_CENTER'
    },
    {
        id:9,
        title: 'Bottom Right',
        key: 'BOTTOM_RIGHT'
    },
]

export const SELECT_CHART_LAYOUT = {
    TOP_LEFT : {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        floating: false,
    },
    TOP_CENTER : {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top'
    },
    TOP_RIGHT : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        floating: false,
    },
    MIDDLE_LEFT : {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        floating: false,
    },
    MIDDLE_CENTER : {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'middle',
        floating: false,
    },
    MIDDLE_RIGHT : {
        layout: 'right',
        align: 'right',
        verticalAlign: 'middle',
        floating: false,
    },
    BOTTOM_LEFT : {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'bottom',
        floating: false,
    },
    BOTTOM_CENTER : {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        floating: false,
    },
    BOTTOM_RIGHT : {
        layout: 'right',
        align: 'right',
        verticalAlign: 'bottom',
        floating: false,
    }
}

export const SET_COLOR_LABEL = [
    {
        key: "< LL",
        field: "#FF0000",
    },
    {
        key: "LL - L",
        field: "#FFA500",
    },
    {
        key: "L - H",
        field: "#008000",
    },
    {
        key: "H - HH",
        field: "#FFA500",
    },
    {
        key: "> HH",
        field: "#FF0000",
    },
]

export const getSensortData = {
    'rows': [
        {
            "sensor": "Pressure sensor",
            "status": 'green',
            "details": 'VisibilitySharp',
            headerAlign: 'leftRow'
        },
        {
            "sensor": "Flow sensor",
            "status": 'green',
            "details": 'VisibilitySharp',
            headerAlign: 'centerRow'
        },
        {
            "sensor": "Vibration sensor",
            "status": 'green',
            "details": 'VisibilitySharp',
            headerAlign: 'centerRow'
        }
    ],
    'columns': [
        {
            field: 'sensor',
            headerName: 'Sensor',
            headerAlign: 'leftRow'
        },
        {
            field: 'status',
            headerName: 'Status',
            fieldType: 'icon',
            headerAlign: 'centerRow'
        },
        {
            field: 'details',
            headerName: 'Details',
            fieldType: 'icon',
            headerAlign: 'centerRow'
        }
    ]
}