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
    "also known as MK, or by her stage name rgb__tears, is a creative technologist and a/v artist. " +
    "She started her career as a software engineer working on a variety of AI research projects, and now uses her years of technical experience to create installation and performance art. " +
    " She is currently a post-doctoral research fellow at Tisch ITP NYU, where she is studying embodied programming techniques, primarily " +
     "coding as performance. Through her art practice she " +
     "seeks to understand liveness in the context of human-technology interactions." +
    " In her free time she enjoys teaching, " +
    "dancing, building experimental websites and playing with new a/v setup configurations. " 
     + "" ,
     "*",
    "If you are looking for a freelancer, or just have a good coffee shop rec 8) ☕, reach out!",
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






