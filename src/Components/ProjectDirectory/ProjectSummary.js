import React, { useEffect } from 'react';
import { projects } from '../../Config/constants'
import { useSelector } from 'react-redux';
import "./ProjectSummary.css"
import _ from "lodash"

function ProjectSummary(props) {

    const {animateBackToMenu, config} = props;
    const active_project_id = useSelector(state => state.active_project);
    const active_project = (active_project_id) ? _.find(projects, function(p) { return p.id === active_project_id; }) : null;
    const active_project_title = (active_project) ? active_project.title : null;


    useEffect(() => {
    }, [])


    let writeup = ""
    let project = _.find(projects, {id:active_project_id})
    let link = (typeof project !== "undefined" && typeof project.link !== "undefined") ? project.link :  null

    if(project) {
        writeup = project.writeup
    }

    function BackButton() {
        return (
            <div>
                <div className={"Back-Button-Container"} style={{position: "fixed"}}>
                    <div className={"Back-Button-Click"} style={{top: "0px", position: 'absolute', zIndex: '10'}} onClick={animateBackToMenu} />
                    <div className={"Back-Button"} style={{top: "0px", position: "absolute"}}>
                        <svg width="25px" height="25px" >
                            <line x1="0" y1="12.5" x2="25" y2="0" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                            <line x1="0" y1="12.5" x2="25" y2="25" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div style={{position: "relative", height: "100%"}}>
            <BackButton/>
            <div className={"Project-Summary"}>
                <div className={"Project-Header-2"}>
                    <div className={"Project-Title-Selected"}>{(active_project_title) ? active_project_title.toUpperCase() : ""}</div>
                </div>
                <br></br>
                <div className={"Writeup"} > {
                    writeup
                }</div>
                <br></br>
                { link && 
                <a target="_blank" rel="noopener noreferrer" href={link}>{project.link_name}</a>
                }
            </div>
        </div>
    );

}

export default ProjectSummary;