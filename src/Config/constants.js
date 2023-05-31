import React from 'react';
import ProjectDirectory from "../Components/ProjectDirectory/ProjectDirectory";
import TerminalT from "../Components/Terminal/Terminal";
import {astropunk_bio, sheldon_bio, music64_bio, aa_bio,
     creature_bio, animation_bio, generative_design_bio, cant_write_up} from "./writeups";
import Video from "../Components/Video/Video";
import About from "../Components/About/About";
import Resume from "../Components/Resume/Resume";

/*
    Directions to add new project to project menu
 */

// TEAL #00ffff


function pageTemplate(left) {
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
            left: left,
            top: Math.floor(Math.random() * 50) + "%"
        },
        bodyStyle: {width: "100%", height: "100%"},
    
    });
}

const project_style = {
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

const terminal_style = {
    borderColor: 'fuchsia',
    color:  'fuchsia',
    width: '28%',
    minWidth: '350px',
    maxHeight: "40%",
    position: "absolute",
    left: "60%",
    top: "4%",
}

const about_style = {
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

let video_window_template = {
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

const picture_window_template = {
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


const video_content_template = {
    percent_of_screen_width: .55,
    header: true,
}

const picture_content_template = {
    width: "100%",
    height: "100%",
    header: false,
    backgroundSize: "cover",
}

export const VIDEO_CONFIGS = {
    "AP": [{
        ...video_content_template,
        src_path: './videos/AstropunkReel.mov',
        title: "",
    }],
    "IE": [],
    "CD": [],
    "AR": [{
        ...video_content_template,
        src_path: './videos/AnimationReel.mov',
        title: "",
    }],
    "C": [{
        ...video_content_template,
        src_path: './videos/Creature.mov',
        title: "",
    }],
    "AA": [{
        ...video_content_template,
        src_path: './videos/aa.mov',
        title: "",
    }],
    'CRT': [
        {
            ...video_content_template,
            src_path: './tv/1.mp4',
            title: "",
        },
        {
            ...video_content_template,
            src_path: './tv/3.mp4',
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
    "AP": [{...video_window_template, style:{...video_window_template.style, top: '5%', left: '40%'}}, picture_window_template ],
    "AR": [video_window_template],
    "C": [video_window_template],
    "CD": [pageTemplate("25%"), pageTemplate("50%"), pageTemplate("75%")],
    "VV": [video_window_template],
    "CRT": [video_window_template, video_window_template],
    "AA": [video_window_template],
}

export const WINDOW_CONTENT = {
    "projects": [<ProjectDirectory config={WINDOW_CONFIGS["projects"][0]}/>],
    "terminal": [<TerminalT/>],
    "about": [<About/>],
    "resume": [<Resume/>],
    "AP": [
        <Video config={VIDEO_CONFIGS["AP"][0]} id={"AP+1"}/>,
        <div style={{...picture_content_template,
            'backgroundImage':"url(/astropunk-mockup.png)"}} id={"AP+2"}/>
        ],
    "AR": [<Video config={VIDEO_CONFIGS["AR"][0]} id={"AR"}/>],
    "C": [<Video config={VIDEO_CONFIGS["C"][0]} id={"C"}/>],
    // "VV": [<Video config={VIDEO_CONFIGS["VV"][0]} id={"VV"}/>],
    "CRT": [<Video config={VIDEO_CONFIGS["CRT"][0]} id={"crt"}/>,
        <Video config={VIDEO_CONFIGS["CRT"][1]} id={"crt2"}/>],
    "CD": [<div style={{...picture_content_template, 'backgroundImage':"url(/cd/1.png)"}} id={"cd1"}/>, 
    <div style={{...picture_content_template, 'backgroundImage':"url(/cd/2.jpg)"}} id={"cd2"}/>, 
    <div style={{...picture_content_template, 'backgroundImage':"url(/cd/3.png)"}} id={"cd3"}/>],
    "AA": [<Video config={VIDEO_CONFIGS["AA"][0]} id={"AA"}/>],
}






export const projects = [
    {
        id: "AA",
        title: "After Afghanistan",
        description: "stories of Afghan refugees",
        writeup: aa_bio,
        link: "https://after-afghanistan-exp-013-d35f15a837954.webflow.io/",
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
        id: "AP",
        title: "Astropunk",
        description: "Generative Music Video Game",
        writeup: astropunk_bio,
        tags: ["A_V", "WEB"]
    },
    {
        id: "AR",
        title: "Animation Reel",
        description: "Sample of animation pieces",
        writeup: animation_bio,
        tags: ["A_V"]

    },
    {
        id: "C",
        title: "The Creature",
        description: "Interactive Web Children's Picture Book",
        writeup: creature_bio,
        tags: ["WEB"]
    }

]



