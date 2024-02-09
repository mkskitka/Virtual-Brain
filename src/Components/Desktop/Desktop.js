import React from 'react';
import { useSelector } from 'react-redux';
import './Desktop.css';
import Draggable from "react-draggable";
import Monster from '../Monster/monster';
import Window from '../Window/Window';
import ActiveProject from '../ActiveProject/ActiveProject'
import { useMediaQuery } from 'react-responsive';
import { WINDOW_CONFIGS, WINDOW_CONTENT } from '../../Config/directories'
import RecordWrapper from "../Record/RecordWrapper";
import Animations from '../Animations/Animations';
import {projects} from '../../Config/projects'
import _ from 'lodash';
import { isVideo, isPhoto, makePhoto, makeVideo } from '../../Utils/helper-utils';




function Desktop() {

    const active_windows = useSelector(state => state.active_windows);
    const record_open = useSelector(state=> state.record_open);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const icon_drag_disabled =  isTabletOrMobile;


    return (
        <div className={"Desktop"}>
            <Animations/>
            {/* <video style={{width: '100vw', height: '100vh', position: 'absolute'}} src="videos/background.mp4" muted autoPlay loop></video> */}

            <div className={"Desktop-Background"}>
            </div>

            {/* <div className={"loadingScreen"}>
                <div className={"computer-gif"}/>
                <div className={"loading-bar-gif"} />
            </div> */}

                <div className={"Desktop-Content"}>
                {/* Contact Bar */}
                    <div id={"contact-bar"}>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/mkskitka">
                        <img alt='github icon' className={"Icon Git"} src={"icons/github-new.png"}/>
                        </a>
                        {/* <img alt='mail icon' className={"Icon Mail"} src={"icons/mail.png"}/> */}
                        <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/rgb__tears/'>
                        <img alt='instagram icon' className={"Icon"} src={"icons/insta-new.png"}/>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/mk-skitka-6b6051135/'>
                        <img alt='Linked In Icon' className={"Icon Li"} src={"/icons/linkedin-new.png"}/>
                        </a>
                    </div>


                    {/* Record Player */}
                        <div style={{"zIndex": -1000}}>{(record_open) ?
                        <RecordWrapper/> : ""}
                    </div>

                    {/* Folders */}
                    {DesktopIcons()}
                    
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
                </div>
        </div>


    );

    function DesktopIcons() {
        return (
        <div>
            <Draggable disabled={icon_drag_disabled}>
                <div id="record-player" className={"Desktop-Icon"}/>
            </Draggable>

            {/* TERMINAL */}
            {/* { !isTabletOrMobile &&
                <Draggable disabled={icon_drag_disabled}>
                    <div id="terminal" className={"Desktop-Icon"}/>
                </Draggable>
            } */}
            <Draggable disabled={icon_drag_disabled}>
                <div id="resume" className="Desktop-Icon">
                    <div style={{top: '100%', position: 'absolute'}}>RESUME</div>
                </div>
            </Draggable>
            <Draggable disabled={icon_drag_disabled}>
                <div id="projects" className={"Desktop-Icon"}>
                    <div style={{top: '100%', position: 'absolute'}}>PORFOLIO</div>
                </div>
            </Draggable>
            <Draggable disabled={icon_drag_disabled}>
                <div id="about" className="Desktop-Icon">
                    <div style={{top: '100%', position: 'absolute'}}>ABOUT</div>
                </div>
            </Draggable>
            <Draggable disabled={icon_drag_disabled}>
                <a target="_blank" rel="noopener noreferrer" href='https://www.notion.so/mkskitka/MK-s-ITP-Blog-19a39e6f66bb46fd98ed022f7ff62452'>
                    <div id="blog" className="Desktop-Icon">
                        <div style={{top: '100%', position: 'absolute'}}>ITP BLOG</div>
                    </div>
                </a>
            </Draggable>    
        </div>
        )
    }

    function Windows() {
        let DOM_windows = []
            for (let i=0; i<active_windows.length; i++) {
                    // console.log(active_windows[i])
                    let key = active_windows[i]
                    let project = _.find(projects, ['id', key]);
                    // IF PROJECT WINDOW 
                    if(project) {
                        // and is DESKTOP
                        if(!isTabletOrMobile) {
                            //VIDEOS & IMAGES 
                            DOM_windows = DOM_windows.concat(project.media.map(function(url, x) {
                                return (<Window 
                                    key={"window-" + key +x} 
                                    x={x}
                                    project={project} 
                                    content={ isVideo(url) ? makeVideo(project, url, x) : isPhoto(url) ? makePhoto(project, url, x) : null}
                                    id={key}
                                />)
                            }))
                        }
                        else {
                            // VIEW IN PROJECT DIRECTORY - rendered in projectDirectory.js
                        }
                    }
                    // SPECIAL WINDOW
                    else {
                        DOM_windows = DOM_windows.concat(WINDOW_CONFIGS[key].map(function(config, x) {
                            return (<Window key={"window-" + key +x} config={config} content={WINDOW_CONTENT[key][x]} id={key}/>);
                        }))
                    }
            };

        return(
            DOM_windows
        )

    }

}

export default Desktop;