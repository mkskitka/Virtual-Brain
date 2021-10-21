import React, {useEffect} from 'react';
import {brain} from "../../Config/brain"
import $ from "jquery"
import './About.css';
import {useSelector} from "react-redux";


function About() {

    const record_open = useSelector(state=> state.record_open);


    useEffect(function() {
        $(".About-Background").css("backgroundImage", "url(/color-static.gif)");
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
        }, 1000)
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
            <div className={"About-Content"} >
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

const bios= [
    "",
    "Hi, I'm MK!",
    "Welcome to my ~ VIRTUAL BRAIN ~ ",
    "",
    " I like to investigate phenomenology through the Making of Things. Often I am coding however " +
    "you may also find me prototyping physical interfaces on 'the floor' at 370 Jay St. Brooklyn," +
    " my current creative abode. " +
    "I am pursuing my masters degree researching interactive communication technology with ITP NYU," +
    " a department within the Tisch School of the Arts.",
    "In my free time I enjoy teaching at the freshly minted ITP coding lab, " +
    "rock climbing, and exploring my new living locale, Brooklyn." +
    " Reach out if you want to chat cool project ideas or just have a good coffee shop rec for a gal" +
    " who cherishes her daily cup of joe.",
    "",
    " - MK Skitka"
];




