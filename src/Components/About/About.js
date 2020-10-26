import React, {useEffect} from 'react';
import {brain} from "../../Config/brain"
import $ from "jquery"
import './About.css';


function About() {

    useEffect(function() {
        $(".Profile-Image").css("backgroundImage", "url(/color-static.gif)")
        $(".About-Content").fadeOut(0);
        setTimeout(function () {
            $(".About-Content").fadeIn(500);
            changeBrightness(.8);
        }, 1000)
    }, []);

    function changeBrightness(opacity) {
        $(".About-Content").css("opacity", opacity);
        let after = Math.floor(Math.random() * 2000) + 500;
        let newOpacity = (Math.floor(Math.random() * 100) + 60)/100;
        setTimeout(function(){changeBrightness(newOpacity)}, after)
    }
    return (
        <div className={"About-Wrapper"}>
        <div className={"Profile-Image"}></div>
        <div className={"About-Content"}>
            <div className={"bio"}>{bio0}</div>
            <div className={"bio"}>{bio1}</div>
            <div className={"bio"}>{bio2}</div>
            <div className={"bio"}>{bio25}</div>
            <div className={"bio"}>{bio3}</div>
            <div className={"bio"}>{bio4}</div>
        </div>
        </div>
    );
}

export default About;

export const bio0= "";
export const bio1= "Welcome to my " +
    "   ~ VIRTUAL BRAIN ~.  ";
export const bio2="I'm a self described phenomenological investigator X dreamy engineer, " +
    " always on the hunt for new inter-disciplinary, art inclusive research spaces. ";
export const bio25=    " Imaginative applications of human facing technologies especially when  " +
    " applied to exploring the vast reaches of human-interpersonal communication, " +
    "get's me absolutely jazzed to work everyday. ";
export const bio3= " You too? Shoot me an email about ideas for collaboration. ";
export const bio4= " - MK Skitka";



