import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Desktop.css';
import Draggable from "react-draggable";
import $ from "jquery"
import Monster from '../Monster/monster';
import Window from '../Window/Window';
import ActiveProject from '../ActiveProject/ActiveProject'
import MentalXTech from "../MentalXTech/MentalXTech";

import {ADD_DIRECTORY_WINDOW, OPEN_CLOSE_RECORD} from "../../Redux/actions"
import { WINDOW_CONFIGS, WINDOW_CONTENT } from '../../Config/constants'
import RecordWrapper from "../Record/RecordWrapper";

let FIRST_ENGAGEMENT = false
let FIRST_ENGAGEMENT_ANIMATION = false
const animate_right = -50

function Desktop() {

    const dispatch = useDispatch()
    const active_windows = useSelector(state => state.active_windows);
    const active_project = useSelector(state => state.active_project)
    const record_open = useSelector(state=> state.record_open);


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
                    <div style={{top: '100%', position: 'absolute'}}>PROJECTS</div>
                </div>
            </Draggable>
            <Draggable>
                <div id="about" className="Desktop-Icon">
                    <div style={{top: '100%', position: 'absolute'}}>ABOUT</div>
                </div>
            </Draggable>
            <Draggable>
                <div id="personal_statement" className="Desktop-Icon">
                    <div style={{top: '100%', position: 'absolute'}}>MIT MEDIA LAB PERSONAL STATEMENT</div>
                </div>
            </Draggable>

            <div className={"watermark"}>© Mary Kate Skitka Virtual Brain</div>
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

            {active_project === "MXT" &&
            <MentalXTech/>
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

    function openWindow(id) {
        console.log("opening directory: ", id)
        dispatch({type: ADD_DIRECTORY_WINDOW, id: id})
    }

    function openFolder() {
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
                        openWindow(id)
                    }
                    if(id === "record-player") {
                        dispatch({type: OPEN_CLOSE_RECORD})
                    }
                }
            });
    }
}

export default Desktop;