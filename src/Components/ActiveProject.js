import React, {useEffect} from 'react';
import $ from "jquery"
import {VIDEO_CONFIGS} from "../Config/constants";
import Video from "./Video/Video"
import "./ActiveProject.css"
import Window from "./Window/Window";
import {useSelector} from "react-redux";

function ActiveProject(props) {

//CLEAN
    const active_project = useSelector(state => state.active_project)

    useEffect(() => {
        console.log("active project changed ", active_project)

        if(active_project === "AP") {
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

    function Videos(props) {
        console.log("IN VIDEOS")
        let videos = VIDEO_CONFIGS[active_project];
        console.log("videos", videos)
        return (
            videos.map(function(config){return (<Window content={<Video config={config} id={active_project}/>}
                                                    config={config.windowConfig} id={active_project}/>) })
        );
    }
    console.log(active_project)
    return (
        <div className={"Active-Project"}>{
            (active_project !== null) ?
            <Videos/> : ""
            }
        </div>
    );
}

export default ActiveProject;