import { cloneDeep } from "lodash";
import * as Constants from "../../constants/Constants";

const initialState = {
    dashboards: {},
    selectedDashboard: null,
    tmpData: [],
    selectedDashboardId: null,
};

const dashboardsReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case Constants.EVT_DASHBOARDS_SET_ON_LOAD:
            return { ...state, dashboards: value };

        case Constants.EVT_DASHBOARDS_SET_ON_MENU_LOAD:
            return { ...state, dashboards: { ...state.dashboards, ...value } };

        case Constants.EVT_DASHBOARDS_SET_SELECTED_ID:
            return {
                ...state,
                selectedDashboard: state.dashboards[value],
                selectedDashboardId: value,
            };

        case Constants.EVT_DASHBOARDS_ON_ADD_WIDGET: {            
            if (state.selectedDashboard) {
                state.selectedDashboard.widgets.push(value);
                state.selectedDashboard.layout.push(
                    Constants.getLayoutForChartWidgetById(value)
                );
            }

            state.dashboards[state.selectedDashboardId] =
                state.selectedDashboard;

            return {
                ...state,
                selectedDashboard: { ...state.selectedDashboard },
            };
        }
        case Constants.EVT_DASHBOARDS_ON_ADD_DATASOURCE: {
            if (state.selectedDashboard) {                
                if(state.selectedDashboard.datasource && Array.isArray(state.selectedDashboard.datasource)) {
                    state.selectedDashboard.datasource.push(value[0]);                    
                } else {                    
                    state.selectedDashboard = {...state.selectedDashboard, ...{'datasource' : [value[0]]}};
                }
            }
            state.dashboards[state.selectedDashboardId] = state.selectedDashboard;            
            return {
                ...state,
                selectedDashboard: { ...state.selectedDashboard },
            };            
        }

        case Constants.EVT_DASHBOARDS_ON_REMOVE_WIDGET:
            if (state.selectedDashboard) {
                state.selectedDashboard.layout =
                    state.selectedDashboard.layout.filter(
                        (layout) => layout.i !== value
                    );
                state.selectedDashboard.widgets =
                    state.selectedDashboard.widgets.filter(
                        (widget) => widget.widget_id !== value
                    );
            }

            state.dashboards[state.selectedDashboardId] =
                state.selectedDashboard;

            return {
                ...state,
                selectedDashboard: { ...state.selectedDashboard },
            };
        case Constants.EVT_DASHBOARDS_ON_REMOVE_DATASOURCE:
            if (state.selectedDashboard) {                
                state.selectedDashboard.datasource =
                state.selectedDashboard.datasource.filter(
                    (datasource) => datasource.datasource_id !== value
                );                  
            }
            state.dashboards[state.selectedDashboardId] =
                state.selectedDashboard;
            return {
                ...state,
                selectedDashboard: { ...state.selectedDashboard },
            };
            case Constants.EVT_DASHBOARDS_FILTER_WIDGET:
                if (state.selectedDashboard) {
                    state.selectedDashboard.widgets =
                        state.selectedDashboard.widgets.map(
                            (widget) => {
                                widget.dateSelection = value.dateSelection;
                                widget.startDate = value.startDate;
                                widget.endDate = value.endDate;
                                return widget;
                            } 
                        );
                }
    
                state.dashboards[state.selectedDashboardId] =
                    state.selectedDashboard;
    
                return {
                    ...state,
                    selectedDashboard: { ...state.selectedDashboard },
                };

        case Constants.EVT_DASHBOARDS_ON_UPDATE_WIDGET:
            if (state.selectedDashboard) {
                let index = state.selectedDashboard.widgets.findIndex(
                    (item) => item.widget_id === value.widget_id
                );
                // Replace item at index using native splice
                state.selectedDashboard.widgets.splice(index, 1, value);
                // Object.assign(state.selectedDashboard.widgets[index], value)
            }

            state.dashboards[state.selectedDashboardId] =
                state.selectedDashboard;

            return {
                ...state,
                selectedDashboard: { ...state.selectedDashboard },
            };
        case Constants.EVT_DASHBOARDS_ON_UPDATE_DATASOURCE:
            if (state.selectedDashboard) {                
                let index = state.selectedDashboard.datasource.findIndex(
                    (item) => item.datasource_id === value[0].datasource_id
                );                                
                state.selectedDashboard.datasource.splice(index, 1, value[0]);                
            }

            state.dashboards[state.selectedDashboardId] =
                state.selectedDashboard;

            return {
                ...state,
                selectedDashboard: { ...state.selectedDashboard },
            };

        case Constants.EVT_DASHBOARDS_ON_LAYOUT_CHANGE:
            if (state.selectedDashboard) {
                state.selectedDashboard.layout = value;
            }

            state.dashboards[state.selectedDashboardId] =
                state.selectedDashboard;

            return state;

        case Constants.EVT_DASHBOARDS_ADD_NEW_DASHBOARD:
            const { id, selectedId } = value;

            state.dashboards[id] = selectedId
                ? cloneDeep(state.dashboards[selectedId])
                : {
                      layout: [],
                      widgets: [],
                      datasourceData: []
                  };
            state.selectedDashboardId = state.dashboards[id];
            state.selectedDashboardId = id;

            return { ...state };

        default:
            return state;
    }
};

export default dashboardsReducer;
