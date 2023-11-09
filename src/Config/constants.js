import React from 'react';
import ProjectDirectory from "../Components/ProjectDirectory/ProjectDirectory";
import TerminalT from "../Components/Terminal/Terminal";

import {
    aa_bio, de_bio,
    animation_bio, 
    generative_design_bio, 
    cant_write_up
} from "./writeups";

import {
    pageTemplate,
    project_style,
    terminal_style,
    about_style,
    video_window_template,
    picture_window_template,
    video_content_template,
    picture_content_template
} from "./style_templates";

import Video from "../Components/Video/Video";
import About from "../Components/About/About";
import Resume from "../Components/Resume/Resume";

/*
    Directions to add new project to project menu
 */

// TEAL #00ffff



export const VIDEO_CONFIGS = {
    "DE": [{
        ...video_content_template,
        src_path: './projects/de/1.mov',
        title: "",
    }, 
    {
        ...video_content_template,
        src_path: './projects/de/2.mov',
        title: "",
    }, 
    {
        ...video_content_template,
        src_path: './projects/de/de.mov',
        title: "",
    }],
    "CD": [],
    "AR": [{
        ...video_content_template,
        src_path: './videos/AnimationReel.mov',
        title: "",
    }],
    "AA": [{
        ...video_content_template,
        src_path: './projects/after_afghanistan/aa.mov',
        title: "",
    }],
    'CRT': [
        {
            ...video_content_template,
            src_path: './projects/tv/1.mp4',
            title: "",
        }
    ]
}

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
            style: about_style,
            xH: 50,
            xS: 5,
            bodyStyle: {overflow: "auto", height: "100%", position: "relative"},
            header: false
        }
    ],
    "AR": [video_window_template],
    "CD": [pageTemplate("25%"), pageTemplate("50%"), pageTemplate("75%")],
    "CRT": [video_window_template, video_window_template],
    "AA": [video_window_template],
    "DE": [video_window_template, video_window_template, video_window_template]
}

export const WINDOW_CONTENT = {
    "projects": [<ProjectDirectory config={WINDOW_CONFIGS["projects"][0]}/>],
    "terminal": [<TerminalT/>],
    "about": [<About/>],
    "resume": [<Resume/>],
    "AR": [<Video config={VIDEO_CONFIGS["AR"][0]} id={"AR"}/>],
    "CRT": [<Video config={VIDEO_CONFIGS["CRT"][0]} id={"crt"}/>,
        <Video config={VIDEO_CONFIGS["CRT"][1]} id={"crt2"}/>],
    "CD": [<div style={{...picture_content_template, 'backgroundImage':"url(projects/cd/1.png)"}} id={"cd1"}/>, 
    <div style={{...picture_content_template, 'backgroundImage':"url(projects/cd/2.jpg)"}} id={"cd2"}/>, 
    <div style={{...picture_content_template, 'backgroundImage':"url(projects/cd/3.png)"}} id={"cd3"}/>],
    "AA": [<Video config={VIDEO_CONFIGS["AA"][0]} id={"AA"}/>],
    "DE": [<Video config={VIDEO_CONFIGS["DE"][0]} id={"DE1"}/>, 
           <Video config={VIDEO_CONFIGS["DE"][1]} id={"DE2"}/>, 
           <Video config={VIDEO_CONFIGS["DE"][2]} id={"DE"}/>]
}






export const projects = [
    {
        id: "AA",
        title: "After Afghanistan",
        description: "stories of Afghan refugees",
        writeup: aa_bio,
        link: "https://www.afterafghanistan.org/",
        link_name: "visit website",
        tags: ["WEB"]
    },
    {
        id: "DE",
        title: "Drunk Elephant",
        description: "hair care quiz installation",
        writeup: de_bio,
        link: "",
        link_name: "website",
        tags: ["WEB"]
    },
    {
        id: "CRT",
        title: "Untitled (CRT)",
        description: "interactive installation",
        writeup: generative_design_bio,
        tags: ["A_V"]
    },
    {
        id: "CD",
        title: "Cantaloupe Dadaism",
        description: "AI Fashion Look Book",
        writeup: cant_write_up,
        github: null, 
        link: "https://mkskitka.notion.site/Canteloupe-Diadism-0c1d532fe464430a86ae3c13b804fda5",
        link_name: "project_info",
        tags: []
    },
    {
        id: "AR",
        title: "Animation Reel",
        description: "Sample of animation pieces",
        writeup: animation_bio,
        tags: ["A_V"]

    }
]



