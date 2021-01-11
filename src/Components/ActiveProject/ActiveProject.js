import React, {useEffect} from 'react';
import $ from "jquery"
import {VIDEO_CONFIGS, projects} from "../../Config/constants";
import "./ActiveProject.css"
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_DIRECTORY_WINDOW,
    REMOVE_DIRECTORY_WINDOW,
    CHANGE_ACTIVE_SONG,
    OPEN_CLOSE_RECORD
} from "../../Redux/actions";

function ActiveProject(props) {

    const active_project = useSelector(state => state.active_project)
    const active_song = useSelector(state => state.active_song)
    const active_windows = useSelector(state => state.active_windows)
    const record_open = useSelector(state => state.record_open)
    const dispatch = useDispatch()


    useEffect(() => {
        setTimeout(() => {


        if(active_project !== null) {
            let videos = VIDEO_CONFIGS[active_project];
            videos.map(function (config) {
                console.log("in videos map")
                dispatch({type: ADD_DIRECTORY_WINDOW, id: active_project})
                return config;
            })
        }
        if(active_project === null) {
            if(active_song === "sheldon.m4a" && record_open) {
                document.getElementById("audio-player").pause();
            }
            for(let i=0; i<projects.length;i++) {
                if (active_windows.includes(projects[i].id)){
                    dispatch({type: REMOVE_DIRECTORY_WINDOW, id: projects[i].id})
                }
            }

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
        else if(active_project === "C") {
            $(".Active-Project").fadeOut(0)
            $(".Desktop-Background").fadeOut(0)
                $(".Desktop-Background").css("background-image", "url(/treecreature.png)")
                $(".Desktop-Background").css("background-repeat", "no-repeat")
                $(".Desktop-Background").css("background-position", "right top")
                $(".Desktop-Background").css("filter", "brightness(.4)")
                setTimeout(function () {
                    $(".Active-Project").fadeIn(1000)
                    $(".Desktop-Background").fadeIn(1000)
                }, 100)
        }
        else if(active_project === "AR") {
            $(".Desktop-Background").fadeOut(0)
        }
        else if(active_project === "SH") {
            if (!record_open) {
                dispatch({type: OPEN_CLOSE_RECORD})
            }
            dispatch({type: CHANGE_ACTIVE_SONG, song: "sheldon.m4a"})

        }
        else {

            $(".Desktop-Background").css("background-image", "");
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
        }, 1000);
    }, [active_project]);



    return (
        ""
    );
}

export default ActiveProject;