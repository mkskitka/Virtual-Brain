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
    "Here I plan to document my own inspirations, research, memories, fleeting thoughts, " +
    "deep contemplations, failures, successes, dreams and beyond. ",
    "",
    " I am a software engineer and designer motivated to investigate and expand the human experience though new media applications." +
    " On the day to day you may find me coding up web apps, visualizations, or arduino contraptions " +
    "on 'the floor' at 370 Jay St. Brooklyn," +
    " where I am" +
    " currently pursuing my masters degree in interactive communication technology with ITP NYU. ",
    "In my free time I enjoy mentoring students at the ITP coding lab, " +
    "rock climbing, and exploring my new living locale, Brooklyn. " +
    "If you want to chat cool project ideas or just have a good coffee shop rec 8) ☕ , reach out @ mkskitka@gmail.com ",
    "",
    " - (M)ary (K)ate Skitka"
];




