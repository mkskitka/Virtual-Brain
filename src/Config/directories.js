import React from 'react';
import ProjectDirectory from "../Components/ProjectDirectory/ProjectDirectory";
import TerminalT from "../Components/Terminal/Terminal";

import {
    project_style,
    terminal_style,
    resume_style,
    about_style,
} from "./style_templates";

import About from "../Components/About/About";
import Resume from "../Components/Resume/Resume";

/*
    Directions to add new project to project menu
 */

// TEAL #00ffff


export let WINDOW_CONFIGS = {
    "projects": [
        {
            title: "",
            drag_disabled: true,
            bottom_bar: true,
            style: project_style,
            xH: 50,
            xS: 5,
            bodyStyle: {
                overflowY: "scroll",
                overflowX: "hidden",
                height: "100%",
            },
            header: true,
        }
    ],
    "terminal": [
        {
            title: "",
            drag_disabled: false,
            style: terminal_style,
            bodyStyle: {overflow: "hidden"},
            header: false,
        }
    ],
    "about": [
        {   title: "",
            drag_disabled: true,
            style: about_style,
            xH: 50,
            xS: 5,
            bodyStyle: {overflow: "auto", height: "100%", position: "relative"},
            header: false
        }
    ],
    "resume": [
        {   
            title: "",
            drag_disabled: true,
            style: resume_style,
            xH: 50,
            xS: 5,
            bodyStyle: {overflow: "auto", height: "100%", position: "relative"},
            header: false
        }
    ],
    // "CD": [pageTemplate("25%"), pageTemplate("50%"), pageTemplate("75%")],
}

export const WINDOW_CONTENT = {
    "projects": [<ProjectDirectory/>],
    "terminal": [<TerminalT/>],
    "about": [<About/>],
    "resume": [<Resume/>],
}