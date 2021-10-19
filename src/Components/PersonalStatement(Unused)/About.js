import React, {useEffect} from 'react';
import {brain} from "../../Config/brain"
import $ from "jquery"
import './About.css';
import {useSelector} from "react-redux";


function PersonalStatement() {

    const record_open = useSelector(state=> state.record_open);


    useEffect(function() {
        $(".Profile-Image").css("backgroundImage", "url(/color-static.gif)")
        $(".About-Content").fadeOut(0);
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
        </div>
        </div>
    );
}

export default PersonalStatement;

export const bio0= "";
export const bio1= "Coming Soon.";




