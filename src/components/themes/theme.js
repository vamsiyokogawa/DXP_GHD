import { createMuiTheme } from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";

const fontFamily = "'Roboto', sans-serif;";

const colors = {
    dark: {
        gridLineColor: "#3c3d40",
        textColor: "#fff",
        widgetBorder: "#383b58",
        widgetHeaderTitleColor:'#fff',
        bg: {
            // header: "#080C31",
            header:"#16193a",
            sidebar: "#16193a",
            container: "#080C31",
            widget: "#16193a",
            borderColor:'#333',
            widgetHeader: "transparent",
            footer: "#16193a",
            buttonPrimary: "rgb(29,32,65)",
            paper: "#000",
            hoverColor:'#0c1550',
            scrollColor:'#080c31',
            trackColor:'#383b58',
            iconColor:'#ff0000',
            borderColor2:'rgba(255, 255, 255, 0.23)',
            borderColor2Hover:'rgba(255, 255, 255, 1)',
            separator:'rgba(255, 255, 255, 0.7)',
            popperColor:'#080c31 !important',
            // iconHover:''
        },
        color: {
            primary: "#fff",
            secondary: "#fff",
            sidebar: "#c7d0d9",
            border: "#4c4e68",
            chartLabelColor: '#d1cfcf',
            iconColor:'#d1cfcf',
        },
    },
    light: {
        gridLineColor: "#d3d4d5",
        textColor: "#000",
        widgetHeaderTitleColor:'#000',
        //widgetBorder: "#dfe0e1",
        widgetBorder: "#ccc",
        bg: {
            header: "#111217",
            //sidebar: "#4f5154",
            sidebar:"#181b1f",
            container: "#f0f0f0",
            widget: "#fff",
            borderColor:'#333',
            widgetHeader: "transparent",
            footer: "#002f6f",
            buttonPrimary: "#4f5154",
            paper: "#fff",
            // hoverColor:'rgb(0, 32, 77);',
            hoverColor:'rgb(0, 0, 0, 0.5);',
            scrollColor:'#d7d7d7',
            trackColor:'#eaeaea',
            borderColor2:'rgba(255, 255, 255, 0.23)',
            borderColor2Hover:'rgba(255, 255, 255, 1)',
            separator:'rgba(255, 255, 255, 0.7)',
            popperColor:'#111217 !important'
        },
        color: {
            primary: "#fff",
            secondary: "#000",
            sidebar: "#fff",
            footer: "#000",
            chartLabelColor: '#24282c',
            iconColor:'#d1cfcf',
            kakabIconColor: '#fbfbfb'
        },
        sidebarMenu: {
            background: '#fff',
        }
    },
    black: {
        gridLineColor: "#24282c",
        textColor: "#fff",
        widgetHeaderTitleColor:'#fff',
        widgetBorder: "#333 ",
        bg: {
            header: "#111217",
            sidebar: "#181b1f",
            container: "#111217",
            widget: "#181b1f",
            borderColor:'#333',
            widgetHeader: "transparent",
            footer: "#002f6f",
            buttonPrimary: "#34373d",
            paper: "#fff",
            hoverColor:'#000',
            scrollColor:'#45474a',
            trackColor:'#303236',
            borderColor2:'rgba(255, 255, 255, 0.23)',
            borderColor2Hover:'rgba(255, 255, 255, 1)',
            separator:'rgba(255, 255, 255, 0.7)',
            popperColor:'#111217 !important'
            
        },
        color: {
            primary: "#fff",
            secondary: "#fff",
            sidebar: "#fff",
            footer: "#b0afb9",
            chartLabelColor: '#9a999b',
            iconColor:'#d1cfcf',
            listIconColor:'#ff0000',
        },
        sidebarMenu: {
            background: '#ccc',
        },
    },
};

const commonOverrides = {
    MuiTableSortLabel: {
        icon: {
            marginLeft: "0px !important",
            marginRight: "0px !important"
        }
    },
    MuiTableCell: {
        sizeSmall: {
            padding: '7px 16px'
        }
    },
    MuiToolbar: {
        gutters: {
            paddingLeft: "0 !important",
            paddingRight: "15px !important",
        },
        regular: {
            minHeight: "45px !important",
        },
    },
    MuiTypography: {
        h6: {
            fontSize: "15px",
            fontFamily: fontFamily,
            fontWeight: 500,
            lineHeight: 1.6,
            color: colors.dark.color.primary,
        },
        body1: {
            fontSize: "13px",
            fontFamily: fontFamily,
            fontWeight: 400,
            lineHeight: 1.5,
            color: colors.dark.color.primary,
            textTransform: "capitalize",
        },
    },
    MuiSvgIcon: {
        root: {
            fontSize: "14px",
        },
        fontSizeSmall: {
            fontSize: "14px",
        },
    },
    MuiIconButton: {
        root: {
            padding: "10px",
        },
    },
    MuiListItem: {
        gutters: {
            // paddingLeft: 25,
            paddingLeft: 10,
            // paddingRight: 15,
            paddingRight: 5,
            "& .MuiSvgIcon-root": {
                fontSize: 15,
                // color: "black"
            },
        },
    },
    MuiLink: {
        underlineHover: {
            cursor: "pointer",
            color: "#7a7d8d",
            fontSize: 14,
            fontWeight: 600,
        },
    },
};

/*
 *  Start-Blue Theme 
*/
export const darkTheme = createMuiTheme({
    root: {
        fontFamily: fontFamily,
        widgetShadow:
            "0 4px 8px 0 rgb(0 0 0), 0 6px 20px 0 rgb(255 255 255 / 16%)",
    },
    palette: {
        type: "dark",
        primary: {
            main: "#fff",
        },
        secondary: blue,
        textColor: colors.dark.textColor,
        widgetHeaderTitleColor: colors.dark.widgetHeaderTitleColor,
        backgroundColor: colors.dark.backgroundColor,
        gridLineColor: colors.dark.gridLineColor,
        hiddenColor: "#333",
        widgetBorder: colors.dark.widgetBorder,
        highlight: "#fff",
        bg: colors.dark.bg,
        color: colors.dark.color,
        // tableBorder: '1px solid #383b58 !important',
        titleColor:"#d1cfcf",
        titleHoverColor:"#080c31",
        tableRowBgColor : "#1d2040",
        tableRowBorder: "#343753",
        tableRowHover: "#181c3d",
        tableCellHoverBorder: '1px solid #494b65 !important',
        tableCellColor: '#d1cfcf !important',
        pumpDropdown: {
            head: {
                // boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
                background: "#12163b"
            },
            icon: {
                color: "#d1cfcf",
                fontSize: '14px',
                '& .MuiTypography-body1': {
                    fontSize: '14px',
                    color: "#d1cfcf",
                }
            }
        },
        tableHeadObject: {
            background:'#080c31',
            color:'#fff',
            border:'1px solid #383b58 !important',
            boxSizing:'border-box',
            lineHeight:'1.4',
            fontSize: '15px',
            '&:first-child': {
                borderLeft:'1px solid transparent !important',
                '&:hover':{
                    borderLeft:'1px double #002652 !important',
                },
            },
            '&:last-child': {
                borderRight:'1px solid transparent !important',
                '&:hover':{
                    borderRight:'1px double #002652 !important',
                },
            },
            '&:hover': {
                border:'1px double #002652 !important',
            }
        },
        tableBodyObject: {
            border:'1px solid #383b58 !important',
            boxSizing:'border-box',
            '&:first-child': {
                borderLeft:'1px solid transparent !important',
                '&:hover':{
                    borderLeft:'1px double #494b65 !important',
                },
            },
            '&:last-child': {
                borderRight:'1px solid transparent !important',
                '&:hover':{
                    borderRight:'1px double #494b65 !important',
                },
            },
            '&:hover': {
                border: '1px double #494b65 !important',     
            }
        }
    },
    typography: {
        fontFamily: fontFamily,
        fontSize: 14,
    },
    shape: {
        borderRadius: 0,
    },
    overrides: {
        ...commonOverrides,
        MuiPaper: {
            root: {
                color: colors.dark.textColor,
                backgroundColor: "transparent",
                '& .MuiDataGridMenu-root, .MuiDataGrid-gridMenuList':{
                    background: '#080C31 !important',

                },
            },
            elevation4: {
                boxShadow: "none !important",
            },
        },
        MuiCard: {
            root: {
                overflow: "hidden",
                backgroundColor: colors.dark.backgroundColor,
                // boxShadow: "0 0 20px #000",
            },
        },
        MuiButton: {
            root: {},
            textPrimary: {
                color: colors.dark.textColor,
            },
            containedPrimary: {
                backgroundColor: 'rgb(29,32,65)',
                filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#1d2041",endColorstr="#111936",GradientType=1)',
                border: "1px solid " + colors.dark.color.boder,
                fontSize: "12px",
                color: "#d8d9da",
                // borderRadius: "20px",
                '&:hover': {
                    backgroundColor:  colors.dark.bg.hoverColor,
                  },

            },
        },
        MuiDialogTitle: {
            root: {
                backgroundColor: '#16193a',
                color: colors.dark.color.primary,
	            borderRadius: '20px 20px 0 0',
            },
        },
        MuiCardContent: {
            root: {
                padding: 0,
            },
        },
        MuiDataGrid: {
            root: {
                color: colors.dark.color.primary,
                border:'1px solid ' + colors.black.bg.container,
                backgroundColor: colors.dark.bg.widget,
                "& .MuiDataGrid-columnsContainer": {
                    backgroundColor: "transparent",
                    borderBottom:'1px solid ' + colors.dark.bg.container,
                },
                background: "#191e3e",
                "& .MuiDataGrid-colCellTitle": {
                    fontWeight: "bold",
                },
                '& .MuiDataGrid-iconSeparator': {
                    display: 'none',
                },
                '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                    borderRight: `1px solid ${colors.dark.bg.container}`,
                    borderBottom: `1px solid ${colors.dark.bg.container}`,
                    whiteSpace: 'nowrap;'
                },
                '& .MuiDataGrid-colCell': {
                    borderRight: `1px solid ${colors.dark.bg.container}`,
                    borderBottom: `1px solid ${colors.dark.bg.container}`,
                },
                '& .MuiTablePagination-root': {
                    color: '#fff',
                },
            },
        },
        MuiDialog: {
            paper: {
                backgroundColor: '#080C31',
                borderRadius: '20px',
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: "#12163b",
            },
        },
        MuiListItemIcon: {
            root: {
               minWidth:'30px',
            },
        },
          MuiListItem: {
            
            root: {
                ":hover&::before":{
             
                    position:'absolute',
                    content:"''",
                    width:'118%',
                    height:'100%',
                    backgroundColor:' #16193a !important',
                    right:' 0',
                    bottom:'0',
                    zIndex: 9,
                    borderTop:'1px solid #313237 !important',
            
                },
                "&:hover": {
                   
                    backgroundColor: "#16193a !important",
                    color: "#fff"
                    
                },
                '&.MuiMenuItem-root':{
                    ":hover&::before":{
             
                        position:'absolute',
                        content:"''",
                        width:'118%',
                        height:'100%',
                        backgroundColor:' transparent !important',
                        right:' 0',
                        bottom:'0',
                        zIndex: 9,
                        borderTop:'1px solid  transparent !important',
                
                    },
                    "&:hover": {
                   
                        backgroundColor: "#16193a !important",
                        color: "#fff"
                        
                    },
                    '&.Mui-selected':{
               
                        backgroundColor: "#16193a !important",
                        "&::before":{
                            position:'absolute',
                            content:"''",
                            width:'118%',
                            height:'100%',
                            backgroundColor:' transparent !important',
                            right:' 0',
                            bottom:'0',
                            zIndex: 9,
                            borderTop:'1px solid transparent !important',
                        }
                    },
                },
                '&.Mui-selected':{
               
                    backgroundColor: "#16193a !important",
                    "&::before":{
                        position:'absolute',
                        content:"''",
                        width:'118%',
                        height:'100%',
                        backgroundColor:' #16193a !important',
                        right:' 0',
                        bottom:'0',
                        zIndex: 9,
                        borderTop:'1px solid #313237 !important',
                    }
                },
               
               
            },

           
        },
    },
});

/** 
 * Start-White Theme 
*/
export const lightTheme = createMuiTheme({
    root: {
        fontFamily: fontFamily,
        widgetShadow:
            "0 4px 8px 0 rgb(0 0 0 / 48%), 0 6px 20px 0 rgb(255 255 255 / 16%)",
    },
    palette: {
        type: "light",
        primary: {
            main: "#000",
        },
        secondary: red,
        textColor: colors.light.textColor,
        widgetHeaderTitleColor: colors.light.widgetHeaderTitleColor,
        backgroundColor: colors.light.backgroundColor,
        gridLineColor: colors.light.gridLineColor,
        highlight: "#eee",
        bg: colors.light.bg,
        color: colors.light.color,
        hiddenColor: "#cccccc",
        // tableBorder: '1px solid #c9c9c9 !important',
        widgetBorder: colors.light.widgetBorder,
        titleColor:"#333333",
        titleHoverColor:"rgba(0, 0, 0, 0.4)",
        tableRowBgColor : "#fbfbfb",
        tableRowBorder: "#a1a1a1",
        tableRowHover: "#f0f0f0",
        tableCellHoverBorder: '1.1px solid #a6a6a6 !important',
        tableCellColor: '#24282c !important',
        pumpDropdown: {
            head: {
                border: "1px solid #333333",
                background: "#111217"
            },
            icon: {
                color: "#bfbfbf",
                fontSize: '14px',
                '& .MuiTypography-body1': {
                    fontSize: '14px',
                    color: "#bfbfbf",
                }
            }
        },
        tableHeadObject: {
            background:'#004f9b',
            color:'#ffffff',
            border:'1px solid #c9c9c9 !important',
            boxSizing:'border-box',
            lineHeight:'1.4',
            fontSize: '15px',
            '&:first-child': {
                borderLeft:'1px solid transparent !important',
                '&:hover':{
                    borderLeft:'1px double #CCCCCC !important',
                },
            },
            '&:last-child': {
                borderRight:'1px solid transparent !important',
                '&:hover':{
                    borderRight:'1px double #CCCCCC !important',
                },
            },
            '&:hover': {
                border:'1px double #CCCCCC !important',
            }
        },
        tableBodyObject: {
            border:'1px solid #c9c9c9 !important',
            boxSizing:'border-box',
            '&:first-child': {
                borderLeft:'1px solid transparent !important',
                '&:hover':{
                    borderLeft:'1px double #a6a6a6 !important',
                },
            },
            '&:last-child': {
                borderRight:'1px solid transparent !important',
                '&:hover':{
                    borderRight:'1px double #a6a6a6 !important',
                },
            },
            '&:hover': {
                border: '1px double #a6a6a6 !important', 
            }
        }
    },
    typography: {
        fontFamily: fontFamily,
        fontSize: 14,
    },
    shape: {
        borderRadius: 0,
    },
    overrides: {
        ...commonOverrides,
        MuiPaper: {
            root: {
                backgroundColor: "transparent",
            },
        },
        MuiCard: {
            root: {
                backgroundColor: colors.light.backgroundColor,
                color: colors.light.color.primary,
            },
        },
        MuiButton: {
            containedPrimary: {
                color: colors.light.color.primary,
                backgroundColor: colors.light.bg.buttonPrimary,
                fontSize: "12px",
                "&:hover": {
                    backgroundColor: "#000",

                },
            },
            contained: {
                boxShadow: "none",
            },
        },
        MuiFormLabel: {
            root: {
                color: "#000",
                "&:focused": {
                    color: "#000"
                },
            },
        },
        // MuiBreadcrumbs:{
        //     separator:{
        //         color:colors.light.bg.separator,
        //     }
        // },
        MuiDialogTitle: {
            root: {
                backgroundColor: colors.light.bg.sidebar,
                color: colors.light.color.primary,
            },
        },
        MuiCardContent: {
            root: {
                padding: 0,
            },
        },
        MuiSelect: {
            icon: {
                color: colors.light.color.primary,
            },
        },
        MuiListItem: {
            root: {

                ":hover&::before":{
                    position:'absolute',
                    content:"''",
                    width:'118%',
                    height:'100%',
                    backgroundColor:' #181b20 !important',
                    right:' 0',
                    bottom:'0',
                    zIndex: 9,
                    borderTop:'1px solid #313237 !important',
            
                },
                "&:hover": {
                   
                    backgroundColor: "#181b20 !important",
                    color: "#fff"
                    
                },
                '&.MuiMenuItem-root':{
                    ":hover&::before":{
             
                        position:'absolute',
                        content:"''",
                        width:'118%',
                        height:'100%',
                        backgroundColor:' transparent !important',
                        right:' 0',
                        bottom:'0',
                        zIndex: 9,
                        borderTop:'1px solid  transparent !important',
                
                    },
                    "&:hover": {
                   
                        backgroundColor: "#181b20 !important",
                        color: "#fff"
                        
                    },
                    '&.Mui-selected':{
               
                        backgroundColor: "181b20 !important",
                        "&::before":{
                            position:'absolute',
                            content:"''",
                            width:'118%',
                            height:'100%',
                            backgroundColor:' transparent !important',
                            right:' 0',
                            bottom:'0',
                            zIndex: 9,
                            borderTop:'1px solid transparent !important',
                        }
                    },
                },
                '&.Mui-selected':{
               
                    backgroundColor: "#181b20 !important",
                    "&::before":{
                        position:'absolute',
                        content:"''",
                        width:'118%',
                        height:'100%',
                        backgroundColor:' #181b20 !important',
                        right:' 0',
                        bottom:'0',
                        zIndex: 9,
                        borderTop:'1px solid #313237 !important',
                    }
                },
               
                // "&:hover": {
                //     backgroundColor: '#111217 !important',
                //     color: "#fff"
                // },
                // "&.Mui-selected": {
                //     backgroundColor: "#111217 !important",
                //     color: "#fff"
                // },
            },
            gutters: {
                // paddingLeft: 25,
                paddingLeft: 10,
                paddingRight: 5,
                "& .MuiSvgIcon-root": {
                    fontSize: 15,
                },
            },
        },
        MuiDataGrid: {
            root: {
                color: colors.light.color.secondary,
                backgroundColor: colors.light.bg.widget,
                textAlign:'center',
                "& .MuiDataGrid-columnsContainer": {
                    backgroundColor: 'tranparent',
                    color: '#000',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    lineHeight: '40px !important',
                    minHeight: '40px !important',
                    maxHeight: '40px !important',
                },
                "& .MuiSvgIcon-root": {
                    fill:'#000',
                    },
                "& .MuiDataGrid-colCellTitle": {
                    fontWeight: "bold",
                    color:"#fffff",
                },
                '& .MuiDataGrid-iconSeparator': {
                    display: 'none',
                },
                '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                    borderRight: `1px solid ${colors.light.bg.container}`,
                    borderBottom: `1px solid ${colors.light.bg.container}`,
                },
                '& .MuiDataGrid-colCell': {
                    borderRight: `1px solid ${colors.light.bg.container}`,
                    borderBottom: `1px solid ${colors.light.bg.container}`,
                },
                '& .MuiTablePagination-root': {
                    color: '#000 !important',
                },
            },
        },
        MuiDialog: {
            paper: {
                backgroundColor: "#fff",
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: "#fff",
            },
        },
        MuiDataGridMenu:{
            root:{
                background: '#fff !important',
            },
        },
        MuiIconButton: {
            root: {
                color: "#fff",
            },

        },

        
        MuiCheckbox: {
            root: {
                color: '#000 !important',
                padding: '0px 5px 0px 0px',
            },
            colorSecondary: {
                '& .Mui-checked':{color: '#fff',}
            },
        },
        MuiListItemIcon: {
            root: {
               minWidth:'30px',
               color:'#d1cfcf !important',
            },
        },
    },
});
/**
 * Start-Black Theme
 */
export const blackTheme = createMuiTheme({
    root: {
        fontFamily: fontFamily,
        widgetShadow:
            "0 4px 8px 0 rgb(0 0 0 / 48%), 0 6px 20px 0 rgb(255 255 255 / 16%)",
    },
    palette: {
        type: "dark",
        primary: {
            main: "#ffffff",
        },
        secondary: red,
        textColor: colors.black.textColor,
        widgetHeaderTitleColor: colors.black.widgetHeaderTitleColor,
        backgroundColor: colors.black.backgroundColor,
        gridLineColor: colors.black.gridLineColor,
        highblack: "#eee",
        bg: colors.black.bg,
        color: colors.black.color,
        hiddenColor: "#333",
        // tableBorder: '1px solid #000 !important',
        widgetBorder: colors.black.widgetBorder,
        titleColor:"#d1cfcf",
        titleHoverColor:"#111217",
        tableRowBgColor : "#1b1f23",
        tableRowBorder: "#363a43",
        tableRowHover: "#18191d",
        tableCellHoverBorder: '1px solid #353942 !important',
        tableCellColor: '#d1cfcf !important',
        pumpDropdown: {
            head: {
                border: "1px solid #333333",
                background: "#111217"
            },
            icon: {
                color: "#bfbfbf",
                fontSize: '14px',
                '& .MuiTypography-body1': {
                    fontSize: '14px',
                    color: "#bfbfbf",
                }
            }
        },
        tableHeadObject: {
            background:'#25282e',
            color:'#2185c7',
            boxSizing:'border-box',
            border:'1px solid #000 !important',
            lineHeight:'1.4',
            fontSize: '14px',
            '&:first-child': {
                borderLeft:'1px solid transparent !important',
                '&:hover':{
                    borderLeft:'1px double rgba(224, 224, 224, 0.2) !important',
                },
            },
            '&:last-child': {
                borderRight:'1px solid transparent !important',
                '&:hover':{
                    borderRight:'1px double rgba(224, 224, 224, 0.2) !important',
                },
            },
            '&:hover': {
                border:'1px double rgba(224, 224, 224, 0.2) !important',
            }
        },
        tableBodyObject: {
            border:'1px solid #000 !important',
            boxSizing:'border-box',
            '&:first-child': {
              borderLeft:'1px solid transparent !important',
              '&:hover':{
                  borderLeft:'1px double rgba(224, 224, 224, 0.2) !important',
              },
            },
            '&:last-child': {
              borderRight:'1px solid transparent !important',
              '&:hover':{
                  borderRight:'1px double rgba(224, 224, 224, 0.2) !important',
              },
            },
            '&:hover': {
              border: '1px double rgba(224, 224, 224, 0.2) !important',
            }
        }
    },
    typography: {
        fontFamily: fontFamily,
        fontSize: 14,
    },
    shape: {
        borderRadius: 0,
    },
    overrides: {
        ...commonOverrides,
        h2:{
            color: '#000 !important'
        },
        MuiIconButton: {
            root: {
                color: "#fff",
            },
        },
        MuiPaper: {
            root: {
                color: colors.dark.textColor,
                backgroundColor: "transparent",

                '& .MuiDataGridMenu-root, .MuiDataGrid-gridMenuList':{
                    background: '#111217 !important',

                },
            },
            elevation4: {
                boxShadow: "none !important",
            },
        },
        MuiCard: {
            root: {
                backgroundColor: colors.black.backgroundColor,
                color: colors.black.color.primary,
            },
        },
        MuiButton: {
            root:{
                color: colors.black.color.primary,
            },
            containedPrimary: {
                color: colors.black.color.primary,
                backgroundColor: colors.black.bg.buttonPrimary,
                fontSize: "12px",
                "&:hover": {
                    backgroundColor: "#000",

                },
            },

            contained: {
                boxShadow: "none",
            },
        },
        MuiFormLabel: {
            root: {
                color: "#fff",
            },
        },
        MuiDialogTitle: {
            root: {
                backgroundColor: colors.black.bg.sidebar,
                color: colors.black.color.primary,
            },
        },
        MuiCardContent: {
            root: {
                padding: 0,
            },
        },
        MuiSelect: {
            icon: {
                color: colors.black.color.primary,
            },
        },

        MuiListItem: {
            
            root: {
                ":hover&::before":{
             
                    position:'absolute',
                    content:"''",
                    width:'118%',
                    height:'100%',
                    backgroundColor:' #181b20 !important',
                    right:' 0',
                    bottom:'0',
                    zIndex: 9,
                    borderTop:'1px solid #313237 !important',
            
                },
                "&:hover": {
                   
                    backgroundColor: "#181b20 !important",
                    color: "#fff"
                    
                },
                '&.MuiMenuItem-root':{
                    ":hover&::before":{
             
                        position:'absolute',
                        content:"''",
                        width:'118%',
                        height:'100%',
                        backgroundColor:' transparent !important',
                        right:' 0',
                        bottom:'0',
                        zIndex: 9,
                        borderTop:'1px solid  transparent !important',
                
                    },
                    "&:hover": {
                   
                        backgroundColor: "#181b20 !important",
                        color: "#fff"
                        
                    },
                    '&.Mui-selected':{
               
                        backgroundColor: "#181b20 !important",
                        "&::before":{
                            position:'absolute',
                            content:"''",
                            width:'118%',
                            height:'100%',
                            backgroundColor:' transparent !important',
                            right:' 0',
                            bottom:'0',
                            zIndex: 9,
                            borderTop:'1px solid transparent !important',
                        }
                    },
                },
                '&.Mui-selected':{
               
                    backgroundColor: "#181b20 !important",
                    "&::before":{
                        position:'absolute',
                        content:"''",
                        width:'118%',
                        height:'100%',
                        backgroundColor:' #181b20 !important',
                        right:' 0',
                        bottom:'0',
                        zIndex: 9,
                        borderTop:'1px solid #313237 !important',
                    }
                },
                           
            },

            gutters: {
                paddingLeft: 10,
                paddingRight: 5,
                "& .MuiSvgIcon-root": {
                    fontSize: 15,
                    },
            },
        },
        MuiDataGrid: {
            root: {
                color: colors.black.color.secondary,
                backgroundColor: colors.black.bg.widget,
                border: '1px solid transparent' ,
                "& .MuiDataGrid-columnsContainer": {
                    backgroundColor: colors.black.bg.sidebar,
                    color: colors.black.color.primary,
                    borderRadius: 0,
                    border: '1px solid #8c8d8f',
                    borderBottom:'none',
                    borderRight:'none'
                },
                "& .MuiSvgIcon-root": {
                    fill:'#fff',
                    },
                "& .MuiDataGrid-colCellTitle": {
                    fontWeight: "bold",
                    color:"#fff",
                },

                "& .MuiDataGrid-footer": {
                    minHeight: '62px',
                },
                '& .MuiDataGrid-iconSeparator': {
                    display: 'none',
                },

                '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                    borderRight: `1px solid #8c8d8f`,
                    borderBottom: `1px solid #8c8d8f`,
                },
                '& .MuiDataGrid-colCell': {
                    borderRight: `1px solid #8c8d8f`,
                    borderBottom: `1px solid #8c8d8f`,
                },

                '& .MuiTablePagination-root': {
                    color: '#fff',

                },
            },
        },
        MuiDialog: {
            paper: {
                backgroundColor: "#22252b",
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: "#111217",
            },
        },
        MuiInputBase: {
            root: {
              color: "#fff",
            },
        },
        MuiFormHelperText: {
            root: {
                color: "#adadad"
            }
        },
        MuiInputLabel: {
            root: {
                color: "#adadad",
            },
        },
        MuiInput: {
            underline: {
          //      borderBottom: "1px solid rgba(255, 255, 255, 1)",
            },
        },
        MuiListItemIcon: {
            root: {
               minWidth:'30px',
               color:'#d1cfcf',
               
            },

        },
        MuiCheckbox: {
            root: {
                color: '#fff !important',
                padding: '0px 5px 0px 0px',
            },
            colorSecondary: {
                '& .Mui-checked':{color: '#fff',}
            },
        },
        MuiTable:{
            root: {

                '& .MuiTableCell-body':{ color: '#fff', textAlign:'left', 
                borderBottom: '1px solid rgba(224, 224, 224, 0.2)',
            }

            },
        },
        MuiRadio: {
            root: {
                color: '#fff',

            },
        },
    },
});
