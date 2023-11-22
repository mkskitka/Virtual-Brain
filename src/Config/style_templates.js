export function pageTemplate(left) {
    return ({
        title: "",
        drag_disabled: false,
        bottom_bar: false,
        video_aspect_ratio: false,
        style: {
            borderColor: "#0055ff",
            color: "#0055ff",
            position: "absolute",
            overflow: "hidden",
            width: '350px',
            height: '520px',
            left: "32%",
            top: Math.floor(Math.random() * 50) + "%"
        },
        bodyStyle: {width: "100%", height: "100%"},
    
    });
}

export const project_style = {
    borderColor: "#0055ff",
    color:  "#0055ff",
    width: '27%',
    minWidth: "350px",
    height: "100%",
    position: "relative",
    left: "0px",
    top: "0px",
    backgroundColor: "transparent",
    //display: "inline-block"
}

export const terminal_style = {
    borderColor: 'fuchsia',
    color:  'fuchsia',
    width: '28%',
    minWidth: '350px',
    maxHeight: "40%",
    position: "absolute",
    left: "60%",
    top: "4%",
}

export const about_style = {
    borderColor: '#00ffff',
    color:  '#00ffff',
    width: '100%',
    height: '100%',
    position: "absolute",
    left: "0%",
    padding: "0px",
    top: "0%",
    zIndex: 2,
}

export const resume_style = {
    borderColor: 'fuchsia',
    color:  'fuchsia',
    width: '100%',
    height: '100%',
    position: "absolute",
    left: "0%",
    padding: "0px",
    top: "0%",
    zIndex: 2,
}

export const video_window_template = {
    title: "",
    drag_disabled: false,
    bottom_bar: false,
    video_aspect_ratio: true,
    style: {
        borderColor: "#0055ff",
        color: "#0055ff",
        width: '.50',
        position: "absolute",
        overflow: "hidden",
        left: "32%",
        top: "15%"
    },
    bodyStyle: {},

};

export const picture_window_template = {
    title: "",
    drag_disabled: false,
    bottom_bar: false,
    video_aspect_ratio: true,
    style: {
        borderColor: "#0055ff",
        color: "#0055ff",
        position: "absolute",
        overflow: "hidden",
        width: '.3',
        height: '200px',
        left: "25%",
        top: "60%"
    },
    bodyStyle: {width: "100%", height: "100%"},

};


export const video_content_template = {
    percent_of_screen_width: .55,
    header: true,
}

export const picture_content_template = {
    // width: '400px',
    // height: "400px",
    header: false,
    backgroundSize: "cover",
}