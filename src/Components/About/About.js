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
    "also known as MK, or by her stage name rgb__tears, is a software engineer and artist." +
    " She is currently a post-doctoral fellow at Tisch ITP NYU, where she is studying embodied programming techniques, primarily " +
     "coding as performance. She intends to re-evaluate the dogmas surrounding software engineering and " +
     "seeks to understand liveness through the context of technology." +
    " In her free time she enjoys teaching students to code, " +
    "live coding, dancing, building cool websites, learning about a/v configurations, and making shit with her hands. 'I learn best by messing with the things around me and seeing what happens. " 
     + " It never fails to suprise me the the insights you glean from observing the unexpected. '" ,
     "*",
    "If you want to chat cool project ideas or just have a good coffee shop rec 8) ☕ , reach out!",
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






