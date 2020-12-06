import React, {useEffect} from 'react';
import {brain} from "../../Config/brain"
import $ from "jquery"
import './About.css';
import {useSelector} from "react-redux";


function About() {

    const record_open = useSelector(state=> state.record_open);


    useEffect(function() {
        $(".Profile-Image").css("backgroundImage", "url(/color-static.gif)")
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
            $(".Profile-Image").fadeOut(0)
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
        <div className={"About-Wrapper"}>
         <div className={"Profile-Image"}/>
        <div className={"About-Content"}>
            <div className={"bio"}>{bio0}</div>
            <div className={"bio"}>{bio1}</div>
            <div className={"bio"}>{bio2}</div>
            <div className={"bio"}>{bio25}</div>
            <div className={"bio"}>{bio3}</div>
            <div className={"bio"}>{bio4}</div>
            <div className={"bio"}>{bio5}</div>
        </div>
        </div>
    );
}

export default About;

export const bio0= "";
export const bio1= "Hi, I'm MK.";
export const bio2 =  "Welcome to my " +
"   ~ VIRTUAL BRAIN ~"
export const bio25=" My wish is that you can get to know me better through this website than though anything I could write here. " +
    "With that said, I would describe myself as a Phenomenological Investigator and Maker of Things. " +
    " I'm currently looking for opportunities to study paradigms of producing affect in the intersections and fringes of new" +
    " media interfaces. Working in AI research for over two years now, I have an appreciation and understanding for the capabilities of advancing computation" +
    ". I am now looking to leave research in the theoretical, studying this uncharted landscape of interaction through an applied approach." +
    " My goal is to democratize " +
    "technology to empower voices left unheard, normalize vulnerability in communication and broaden the space of human expressiveness to create a more unified world.";
export const bio3=    "  ";
export const bio4= " Please reach out if you are interesting in collaborating. Wishing you a sound mind during these unprecedented times.";
export const bio5= " - MK Skitka";



