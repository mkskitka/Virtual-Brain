import React from 'react';
import ProjectDirectory from "../Components/Window/ProjectDirectory";
import TerminalT from "../Components/Terminal/Terminal";
import {astropunk_bio, sheldon_bio, music64_bio, creature_bio, mental_health_tech_bio, animation_bio} from "./writeups";

const project_style = {
    borderColor: "#0055ff",
    color:  "#0055ff",
    width: '24%',
    maxHeight: "90%",
    position: "absolute",
    overflowY: "scroll",
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

const video_window_template = {
    title: "",
    drag_disabled: false,
    bottom_bar: false,
    style: {
        borderColor: "#0055ff",
        color: "#0055ff",
        width: '600px',
        height: '340px',
        position: "absolute",
        overflow: "hidden",
        left: "40%",
        top: "30%"
    }
};
const video_content_template = {
    width: 600,
    height: 400,
    top: -65,
}

export const WINDOW_CONTENT = {
    "projects": [<ProjectDirectory/>],
    "terminal": [<TerminalT/>]
}

export const WINDOW_CONFIGS = {
    "projects": [
        {
            title: "Projects",
            drag_disabled: false,
            bottom_bar: true,
            style: project_style,
        }
    ],
    "terminal": [
        {
            title: "",
            drag_disabled: false,
            style: terminal_style,
        }
    ],
    "AP": [video_window_template],
    "AR": [video_window_template],
    "C": [video_window_template],
    "VV": [video_window_template],


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
    "Sh": [],
    'VV': [{
        ...video_content_template,
        src_path: './videos/ViolinsVibrato.mov',
        title: "",
    }],
    "GD": [],
    "VB": [],
    "MD": [],
    "CR": [],
}


export const projects = [
    {
        id: "IE",
        title: "Isolation Experiments",
        description: "Created in Quarentine",
        writeup: "testing",
        writeup_y: 400,
    },
    {
        id: "AP",
        title: "Astropunk",
        description: "Generative Music Video Game",
        writeup: astropunk_bio,
        writeup_y: 400,
    },
    {
        id: "AR",
        title: "Animation Reel",
        description: "Sample of animation pieces",
        writeup: animation_bio,
        writeup_y: 300,

    },
    {
        id: "MXT",
        title: "Mental Health X Tech",
        description: "Reusable Human Data Visualization",
        writeup: mental_health_tech_bio,
        writeup_y: 350,
    },
    {
        id: "C",
        title: "The Creature",
        description: "Interactive Web Children's Picture Book",
        writeup: creature_bio,
        writeup_y: 400,
    },
    {
        id: "Sh",
        title: "Sheldon",
        description: "Experimental Sound Project",
        writeup: sheldon_bio,
        writeup_y: 350,
    },
    {
        id: 'VV',
        title: "Violins Vibrato",
        description: "Experimental Video and Sound Project",
        writeup: music64_bio,
        writeup_y: 350,
    },
    {
        id: "GD",
        title: "Generative Design",
        description: "Code Art!",
        writeup_y: 350,
    },
    {
        id: "VB",
        title: "Virtual Brain",
        description: "This Website",
        writeup_y: 350,
    },
    {
        id: "MD",
        title: "ML Doodles",
        description: "Finding Trends in the Subconcious",
        writeup_y: 350,
    },
    {
        id: "CR",
        title: "Canopy Room on The Run",
        description: "Reimagining a physical favorite,virtually",
        writeup_y: 350,
    }
]


