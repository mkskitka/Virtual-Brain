import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Desktop.css';
import Draggable from "react-draggable";
import $ from "jquery"
import _Terminal from "../Terminal/Terminal"
import Monster from '../Monster/monster';
import Window from '../Window/Window';
import ActiveProject from '../ActiveProject/ActiveProject'

import {ADD_DIRECTORY_WINDOW, OPEN_CLOSE_RECORD} from "../../Redux/actions"
import { WINDOW_CONFIGS, WINDOW_CONTENT } from '../../Config/constants'
import RecordWrapper from "../Record/RecordWrapper";

let FIRST_ENGAGEMENT = false
let FIRST_ENGAGEMENT_ANIMATION = false
const animate_right = -80

function Desktop() {

    const dispatch = useDispatch()
    const windows = useSelector(state => state.active_windows);
    const active_windows = useSelector(state => state.active_windows);
    const record_open = useSelector(state=> state.record_open);

    console.log("record open ", record_open)

    useEffect(() => {
        openFolder()

    }, [])

    useEffect(() => {
        if(FIRST_ENGAGEMENT && !FIRST_ENGAGEMENT_ANIMATION) {
            FIRST_ENGAGEMENT_ANIMATION= true
            $("#record-player").animate(
                {
                    right: - animate_right,
                }, 1000, function () {
                    $("#record-player").animate(
                        {
                            top: "-=200"
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
                            top: "-=100"
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
                            top: "+=100"
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

    useEffect(() => {

    }, [record_open])


    return (
        <div className={"Desktop"}>

            <div className={"Desktop-Background"}></div>

            {/* Contact Bar */}

            <div id={"contact-bar"}>
                <a href="https://github.com/mkskitka"><img alt='github icon' className={"Icon Git"} src={"git.png"}/></a>
                {/*<img alt='mail icon' className={"Icon Mail"} src={"mail.png"}/>*/}
                <img alt='instagram icon' className={"Icon"} src={"instagram2.png"}/>
                <a href='https://www.linkedin.com/in/mary-kate-skitka-6b6051135/'><img alt='Linked In Icon' className={"Icon Li"}
                                                                                       src={"linkedin.png"}/></a>
            </div>

            {/* Folders */}

            <Draggable>
                <div id="record-player" className={"Desktop-Icon"}/>
            </Draggable>
            <Draggable>
                <div id="terminal" className={"Desktop-Icon"}/>
            </Draggable>
            <Draggable>
                <div id="projects" className={"Desktop-Icon"}>
                    <div style={{top: '70px', position: 'absolute'}}>PROJECTS</div>
                </div>
            </Draggable>
            <Draggable>
                <div id="about" className="Desktop-Icon">
                    <div style={{top: '70px', position: 'absolute'}}>ABOUT</div>
                </div>
            </Draggable>

            <div className={"watermark"}>© Mary Kate Skitka Virtual Brain</div>
            <Monster/>

            {/* Multi Media Display Windows */}

            {/* Directory Windows */}
            <div> {
                Windows()
            }
            </div>

            {/* Active Project */}
            <div>
               <ActiveProject/>
            </div>
            {/* Record Player */}
            <div>{(record_open) ?
                <RecordWrapper/> : ""}
            </div>

        </div>

    );

    function Windows() {

        const DOM_windows =  windows.map(function(w) {
            return ( WINDOW_CONFIGS[w].map(function(config, i) {
                console.log("key: ", "window-"+w)
                return(<Window key={"window-"+w} config={config} content={WINDOW_CONTENT[w][i]} id={w}/> );
            }))});

        return(
            DOM_windows
        )

    }

    function openWindow(id) {
        console.log("opening directory: ", id)
        dispatch({type: ADD_DIRECTORY_WINDOW, id: id})
    }

    function openFolder() {
        var isDragging = false;
        $(".Desktop-Icon")
            .mousedown(function (e) {
                $(window).mousemove(function () {
                    isDragging = true;
                    $(window).unbind("mousemove");
                });
            })
            .mouseup(function (e) {
                $(window).unbind("mousemove");
                if (!isDragging) {
                    let id = e.target.id;
                    FIRST_ENGAGEMENT = true;
                    if(id === "projects" || id === "terminal") {
                        openWindow(id)
                    }
                    if(id === "record-player") {
                        console.log("opening record player")
                        dispatch({type: OPEN_CLOSE_RECORD})
                    }
                }
                isDragging = false
            });
    }
}

export default Desktop;