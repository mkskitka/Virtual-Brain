import React from 'react';
import ProjectDirectory from "../Components/ProjectDirectory/ProjectDirectory";
import TerminalT from "../Components/Terminal/Terminal";
import {astropunk_bio, sheldon_bio, music64_bio, creature_bio, mental_health_tech_bio, animation_bio, generative_design_bio} from "./writeups";
import Video from "../Components/Video/Video";
import About from "../Components/About/About";
import PersonalStatement from "../Components/PersonalStatement/About";


// TEAL #00ffff

const project_style = {
    borderColor: "#0055ff",
    color:  "#0055ff",
    width: '27%',
    minWidth: "350px",
    height: "90%",
    position: "absolute",
    left: "2%",
    top: "4%",
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
    width: 'calc(100% - 6px)',
    height: 'calc(100% - 6px)',
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
    width: 600,
    height: 400,
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
    "AR": [{
        ...video_content_template,
        src_path: './videos/AnimationReel.mov',
        title: "",
    }],
    "MXT": [],
    "C": [{
        ...video_content_template,
        src_path: './videos/Creature.mov',
        title: "",
    }],
    "SH": [],
    'VV': [{
        ...video_content_template,
        src_path: './videos/ViolinsVibrato.mov',
        title: "",
    }],
    "GD": [],
    "VB": [],
    "MD": [],
    "CR": [],
    "WB": [],
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
            bodyStyle: {overflow: "scroll", height: "100%", position: "relative"},
            header: false}
        ],
    "personal_statement" : [
        {   title: "",
            drag_disabled: true,
            style: about_style,
            xH: 50,
            xS: 5,
            bodyStyle: {overflow: "scroll", height: "100%", position: "relative"},
            header: false}
    ],
    "AP": [video_window_template, picture_window_template],
    "AR": [video_window_template],
    "C": [video_window_template],
    "VV": [video_window_template],
    "PersonalStatement": [{ ...picture_window_template,
                            style: {
                                ...picture_window_template.style,
                                top: "20%",
                                left: "10%",
                                opacity: ".8",
                                width: "400px",
                                height: "400px",
                            },
                            titleStyle: {
                                fontSize: "64px",
                            },
                            title: 'Personal Statement Coming......... TODAY!',
                        }
    ],
    "SH": [], // NO extra windows
}

export const WINDOW_CONTENT = {
    "projects": [<ProjectDirectory config={WINDOW_CONFIGS["projects"][0]}/>],
    "terminal": [<TerminalT/>],
    "about": [<About/>],
    "personal_statement": [<PersonalStatement/>],
    "AP": [<Video config={VIDEO_CONFIGS["AP"][0]} id={"AP+1"}/>,
        <div style={{...picture_content_template,
            'backgroundImage':"url(/astropunk-mockup.png)"}} id={"AP+2"}/>],
    "AR": [<Video config={VIDEO_CONFIGS["AR"][0]} id={"AR"}/>],
    "C": [<Video config={VIDEO_CONFIGS["C"][0]} id={"C"}/>],
    "VV": [<Video config={VIDEO_CONFIGS["VV"][0]} id={"VV"}/>],
    "PersonalStatement":  [
    <div style={{...picture_content_template}} id={"cs"}/>],
}






export const projects = [
    {
        id: "IE",
        title: "Isolation Experiments",
        description: "Created in Quarentine",
        writeup: "coming soon",
        tags: ["NEW MEDIA", "HCI"]
    },
    {
        id: "AP",
        title: "Astropunk",
        description: "Generative Music Video Game",
        writeup: astropunk_bio,
        tags: ["NEW MEDIA", "HCI", "AI"]
    },
    {
        id: "AR",
        title: "Animation Reel",
        description: "Sample of animation pieces",
        writeup: animation_bio,
        tags: []

    },
    {
        id: "MXT",
        title: "Mental Health X Tech",
        description: "Reusable Human Data Visualization",
        writeup: mental_health_tech_bio,
        tags: ["HCI"]

    },
    {
        id: "C",
        title: "The Creature",
        description: "Interactive Web Children's Picture Book",
        writeup: creature_bio,
        tags: ["NEW MEDIA", "HCI"]
    },
    {
        id: "SH",
        title: "Sheldon",
        description: "Experimental Sound Project",
        writeup: sheldon_bio,
        tags: ["NEW MEDIA"]
    },
    {
        id: 'VV',
        title: "Violins Vibrato",
        description: "Experimental Video and Sound Project",
        writeup: music64_bio,
        tags: ["NEW MEDIA"]
    },
    {
        id: "GD",
        title: "Generative Design",
        description: "Code Art!",
        writeup: generative_design_bio,
        tags: ["NEW MEDIA"]
    },
    {
        id: "VB",
        title: "Virtual Brain",
        description: "This Website",
        writeup: generative_design_bio,
        tags: ["NEW MEDIA", "HCI"]
    },
    {
        id: "MD",
        title: "ML Doodles",
        description: "Finding Trends in the Subconcious",
        writeup: generative_design_bio,
        tags: ["NEW MEDIA", "AI"]
    },
    {
        id: "CR",
        title: "Canopy Room on The Run",
        description: "Reimagining a physical favorite,virtually",
        writeup: generative_design_bio,
        tags: ["NEW MEDIA", "HCI"]
    },
    // {
    //     id: "WB",
    //     title: "Web Design and Development",
    //     description: "From Vis to Database",
    //     writeup_y: 450,
    // }
]



