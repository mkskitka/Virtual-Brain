import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Desktop.css';
import Draggable from "react-draggable";
import $ from "jquery"
import Monster from '../Monster/monster';
import Window from '../Window/Window';
import ActiveProject from '../ActiveProject/ActiveProject'
import MentalXTech from "../MentalXTech/MentalXTech";
import { useMediaQuery } from 'react-responsive';

import {ADD_DIRECTORY_WINDOW, CHANGE_ACTIVE_PROJECT, OPEN_CLOSE_RECORD, ROUTE_TO_PROJECT} from "../../Redux/actions"
import { WINDOW_CONFIGS, WINDOW_CONTENT } from '../../Config/constants'
import RecordWrapper from "../Record/RecordWrapper";

import ReactDOM from "react-dom";
import {
    useLocation
} from "react-router-dom";


let FIRST_ENGAGEMENT = false
let FIRST_ENGAGEMENT_ANIMATION = false
const animate_right = -50
const timeToLoadDesktop = 0;

function Desktop() {

    const dispatch = useDispatch()
    const active_windows = useSelector(state => state.active_windows);
    const record_open = useSelector(state=> state.record_open);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const [isLoadingVirtualBrain, setIsLoadingVirtualBrain] = useState(true);
    const icon_drag_disabled =  isTabletOrMobile;
    const isMobile = useMediaQuery({ maxWidth: 767 })


    useEffect(() => {
        setTimeout(function (){
            setIsLoadingVirtualBrain(false);
            $(".Desktop-Content").fadeOut(0);
            $(".loadingScreen").fadeOut(200);
            setTimeout(function () {
                onClickCallbacks()
                responsiveCallbacks()
                $(".Desktop-Content").fadeIn(1000);
            }, 500)
        }, timeToLoadDesktop);
    }, [])

    useEffect(() => {
        if(FIRST_ENGAGEMENT && !FIRST_ENGAGEMENT_ANIMATION && !isTabletOrMobile) {
            FIRST_ENGAGEMENT_ANIMATION= true
            $("#record-player").animate(
                {
                    right: - animate_right,
                }, 1000, function () {
                    $("#record-player").animate(
                        {
                            top: "-=260"
                        }
                    )
                }
            )
            $("#about").animate(
                {
                    right: - animate_right - 10,
                }, 1300, function () {
                    $("#about").animate(
                        {
                            top: "-=140"
                        }
                    )
                }
            )
            $("#terminal").animate(
                {
                    right: -animate_right,
                }, 1500,  function () {
                    $("#terminal").animate(
                        {
                            top: "+=140"
                        }
                    )
                }
            )
            $("#projects").animate(
                {
                    right: -animate_right,
                }, 1700, function () {
                    $("#projects").animate(
                        {
                            top: "+=2"
                        }
                    )
                }
            )
        }
    }, [active_windows])

    // if(isMobile) {
    //     $("body").css("overflowY", "scroll");
    // }

    return (
        <div className={"Desktop"}>
            <div className={"Desktop-Background"}></div>

            <div className={"loadingScreen"}>
                <div className={"computer-gif"}/>
                <div className={"loading-bar-gif"} />
            </div>

            {!isLoadingVirtualBrain &&
                <div className={"Desktop-Content"}>
                {/* Contact Bar */}

                    <div id={"contact-bar"}>
                        <a href="https://github.com/mkskitka">
                        <img alt='github icon' className={"Icon Git"} src={"github.png"}/>
                        </a>
                        {/*<img alt='mail icon' className={"Icon Mail"} src={"mail.png"}/>*/}
                        <a href='https://www.instagram.com/the_dirty_doodle/'>
                        <img alt='instagram icon' className={"Icon"} src={"insta.png"}/>
                        </a>
                        <a href='https://www.linkedin.com/in/mary-kate-skitka-6b6051135/'>
                        <img alt='Linked In Icon' className={"Icon Li"} src={"linked_in.png"}/>
                        </a>
                    </div>

                    {/* Folders */}

                    <Draggable disabled={icon_drag_disabled}>
                    <div id="record-player" className={"Desktop-Icon"}/>
                    </Draggable>
                    {/*{ !isTabletOrMobile &&*/}
                    {/*    <Draggable disabled={icon_drag_disabled}>*/}
                    {/*        <div id="terminal" className={"Desktop-Icon"}/>*/}
                    {/*    </Draggable>*/}
                    {/*}*/}
                    <Draggable disabled={icon_drag_disabled}>
                        <div id="projects" className={"Desktop-Icon"}>
                            <div style={{top: '100%', position: 'absolute'}}>PROJECTS</div>
                        </div>
                    </Draggable>
                    <Draggable disabled={icon_drag_disabled}>
                        <div id="about" className="Desktop-Icon">
                            <div style={{top: '100%', position: 'absolute'}}>ABOUT</div>
                        </div>
                    </Draggable>
                    <Draggable disabled={icon_drag_disabled}>
                        <a href='https://www.notion.so/mkskitka/MK-s-ITP-Blog-19a39e6f66bb46fd98ed022f7ff62452'>
                            <div id="blog" className="Desktop-Icon">
                                <div style={{top: '100%', position: 'absolute'}}>BLOG</div>
                            </div>
                        </a>
                    </Draggable>
                    <div className={"monogram"}/>
                    <div className={"watermark"}></div>
                    <Monster/>

                    {/* Multi Media Display Windows */}

                    {/* Directory Windows */}{
                        Windows()
                    }

                    {/* Active Project */}
                        <div>
                        <ActiveProject/>
                        </div>
                    {/* Record Player */}
                        <div>{(record_open) ?
                        <RecordWrapper/> : ""}
                        </div>
                </div>
            }
        </div>


    );

    function Windows() {

        let DOM_windows = []
            for (const [key, value] of Object.entries(WINDOW_CONFIGS)) {
                 if(active_windows.includes(key))
                     DOM_windows = DOM_windows.concat(WINDOW_CONFIGS[key].map(function(config, i) {
                         return (<Window key={"window-" + key +i} config={config} content={WINDOW_CONTENT[key][i]} id={key}/>);
                     }))
                else DOM_windows.push("")
            };

        return(
            DOM_windows
        )

    }

    function responsiveCallbacks() {
        if (isTabletOrMobile) {
            $("#record-player").css("left", "75%").css("top", "5%")
            $("#about").css("left", "80%").css("top", "50%")
            $("#terminal").css("left", "15%").css("top", "70%")
            $("#projects").css("left", "30%").css("top", "30%")
        }
    }

    function onClickCallbacks() {
        var isDragging = false;
        $(".Desktop-Icon")
            .mousedown(function (e) {
                isDragging = false
                setTimeout(function () {
                    isDragging = true;
                }, 500)
            })
    $(".Desktop-Icon")
        .mouseup(function (e) {
            if (!isDragging) {
                let id = e.target.id;
                FIRST_ENGAGEMENT = true;
                if(id === "projects" || id === "terminal" || id == "about" || id=="personal_statement") {
                    dispatch({type: ADD_DIRECTORY_WINDOW, id: id})
                }
                if(id === "record-player") {
                    dispatch({type: OPEN_CLOSE_RECORD})
                }
            }
        });
    }
}

export default Desktop;