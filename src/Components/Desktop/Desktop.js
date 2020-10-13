import React, {useEffect} from 'react';
import './Desktop.css';
import Draggable from "react-draggable";
import Monster from '../monster';
import $ from "jquery"

function Desktop() {
    useEffect(() => {
        openFolder()
    }, [])
    return (
        <div className={"Desktop"}>

            {/* Contact Bar */}

            <div id={"contact-bar"}>
                <a href="https://github.com/mkskitka"><img alt='github icon' className={"Icon Git"} src={"git.png"}/></a>
                <img alt='mail icon' className={"Icon Mail"} src={"mail.png"}/>
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
        </div>

    );

    function openDirectoryWindow() {
        console.log("opening directory window")
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
                    openDirectoryWindow(id)
                }
                isDragging = false
            });
    }
}

export default Desktop;