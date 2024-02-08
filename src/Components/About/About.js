import React, {useEffect} from 'react';
import $ from "jquery"
import './About.css';
import {useSelector} from "react-redux";

const bios= [
    "",
    "Mary Kate Skitka -",
    "*",
    "*",
    "",
    `Mary Kate “MK” Skitka (she/her, b. 1996) is a creative technologist and a/v artist based in Brooklyn. 
    She began her career as a software engineer working  a wide array of AI research projects. 
    Now, she leverages her years of technical experience 
    in industry to create and inspire installation and performance art. 
    Through her artistic practice, she explores the concept of liveness within human-computer interactions and ways we can rethink 
    code culture on a societal and interpersonal level.`,
    "*",
    `Currently, she works as a post-doctoral research fellow at ITP NYU, researching embodied interfaces, 
    primarily coding as a form of performance art. 
    She holds a MPS from NYU Tisch’s Interactive Telecommunications Program (2023) and 
    a BS in Cognitive Brain Science and Computer Science from Tufts University (2018). 
    Her work takes form as experimental websites, interactive installation, 
    event production, wearable programmable devices, and live coding performance.`, 
     "" ,
     "*",
     `Looking to collaborate? - or just have a good coffee shop rec 8) ☕, reach out!`,
    "email: mkskitka@gmail.com ",
     "ig: @rgb__tears ",
    "",
    "*",
    "*",
];


function About() {

    const record_open = useSelector(state=> state.record_open);
    
    useEffect(function() {
        $(".About-Background").css("backgroundImage", "url(/gifs/color-static.gif)");
        $(".About-Background").height($(".About-Content").height()+50);
        $(".About-Content").fadeOut(0);
        if(record_open) {
            let left =  $("#record-wrapper").offset().left
            let to_left =$(window).width() - left - 450
            let top =  $("#record-wrapper").offset().top
            let to_top =$(window).height() - top - 300
                $("#record-wrapper").animate({
                left: "+="+String(to_left),
                top: "+="+String(to_top),
            })

        }
        setTimeout(function () {

            $(".About-Content").fadeIn(500);
            changeBrightness(.8);
        }, 100)
    }, []);

    function changeBrightness(opacity) {
        $(".About-Content").css("opacity", opacity);
        let after = Math.floor(Math.random() * 2000) + 500;
        let newOpacity = (Math.floor(Math.random() * 100) + 70)/100;
        setTimeout(function(){changeBrightness(newOpacity)}, after)
    }
    return (
        <div className={"About-Wrapper"} >
            <div className={"About-Background"} />
            <div style ={{display: "none"}}className={"About-Content"} >
                {Bio()}
            </div>
        </div>
    );
}

function Bio() {
    let content = [];
    for(let i=0; i< bios.length; i++) {
        content.push(<div className={"bio"}>{bios[i]}</div>)
    }
    return content;
}

export default About;






