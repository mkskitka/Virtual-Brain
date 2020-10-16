import React, {useEffect} from 'react';
import $ from "jquery"
import {VIDEO_CONFIGS} from "../../Config/constants";
import "./ActiveProject.css"
import {useDispatch, useSelector} from "react-redux";
import {ADD_DIRECTORY_WINDOW} from "../../Redux/actions";

function ActiveProject(props) {

    const active_project = useSelector(state => state.active_project)
    const dispatch = useDispatch()

    useEffect(() => {

        if(active_project !== null) {
            let videos = VIDEO_CONFIGS[active_project];
            videos.map(function (config) {
                dispatch({type: ADD_DIRECTORY_WINDOW, id: active_project})
                return config;
            })
        }

        console.log("active project changed ", active_project)

        if(active_project === "AP") {
            console.log("Astropunk changing background")
            $(".Desktop-Background").css("background-repeat", "repeat")
            $(".Active-Project").fadeOut(0)
            $(".Desktop-Background").css("background-image", "url(/static.gif)");
            setTimeout(function() {
                $(".Desktop-Background").css("background-image", "url(/AP_background.jpg)")
                setTimeout(function () {
                    $(".Active-Project").fadeIn(0)
                }, 500)

            }, 900);

        }
        if(active_project === "C") {
            $(".Active-Project").fadeOut(0)
            $(".Desktop-Background").fadeOut(0)
                $(".Desktop-Background").css("background-image", "url(/treecreature.png)")
                $(".Desktop-Background").css("background-repeat", "no-repeat")
                $(".Desktop-Background").css("background-position", "right top")
                $(".Desktop-Background").css("opacity", ".5")
                setTimeout(function () {
                    $(".Active-Project").fadeIn(1000)
                    $(".Desktop-Background").fadeIn(1000)
                }, 100)
        }
        if(active_project === "AR") {
            $(".Desktop-Background").fadeOut(0)
        }
        if(active_project === null) {
            $(".Desktop-Background").animate({
                opacity: "0"
            }, 1000);
        }
        else{
            $(".Desktop-Background").animate({
                opacity: "1"
            }, 100);
        }
    }, [active_project])


    return (
        ""
    );
}

export default ActiveProject;