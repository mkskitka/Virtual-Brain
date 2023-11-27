import React, { useEffect } from 'react';
import { projects, ASSET_CAPTIONS } from '../../Config/projects'
import { useSelector } from 'react-redux';
import { project_style } from '../../Config/style_templates';
import "./ProjectSummary.css"
import _ from "lodash"
import {useMediaQuery} from "react-responsive";
import { isVideo, isPhoto, makePhotoMobile, makeVideoMobile } from '../../Utils/helper-utils';
import {Icon} from "semantic-ui-react"

function ProjectSummary(props) {

    const {animateBackToMenu} = props;
    const active_project_id = useSelector(state => state.active_project);
    const active_project = (active_project_id) ? _.find(projects, function(p) { return p.id === active_project_id; }) : null;
    const active_project_title = (active_project) ? active_project.title : null;
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const active_windows = useSelector(state => state.active_windows);


    useEffect(() => {
    }, [])


    let writeup = ""
    let date = ""
    let project = _.find(projects, {id:active_project_id})
    let link = (typeof project !== "undefined" && typeof project.link !== "undefined") ? project.link :  null

    if(project) {
        writeup = project.writeup
        if(project.date) {
            date = project.date
        }
    }

    function BackButton() {
        return (
            <div>
                <div className={"Back-Button-Container"} style={{position: "fixed"}}>
                    <div className={"Back-Button-Click"} style={{top: "0px", position: 'absolute', zIndex: '10'}} onClick={animateBackToMenu} />
                    <div className={"Back-Button"} style={{top: "0px", position: "absolute"}}>
                        <svg width="25px" height="25px" >
                            <line x1="0" y1="12.5" x2="25" y2="0" style={{stroke:project_style.borderColor, strokeWidth:'3'}} />
                            <line x1="0" y1="12.5" x2="25" y2="25" style={{stroke:project_style.borderColor, strokeWidth:'3'}} />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="projSummary" style={{position: "relative", height: "100%"}}>
            <BackButton/>
            <div className={"Project-Header-2"}>
                <div className={"Project-Title-Selected"}>{(active_project_title) ? active_project_title.toUpperCase() : ""}</div>
                <div className='Project-Date'>{date}</div>
            </div>
            <div className={"Project-Summary"}>
                <br></br>
                <div className={"Writeup"} > {
                    writeup
                }</div>
                <br></br>
                { link && 
                <div>
                <a className='link-1' target="_blank" rel="noopener noreferrer" href={link}><Icon name='linkify' size='small' />{project.link_name}</a>
                </div>
                }
                {/* start */}
                {
                    isMobile ? 
                    <div className='Gallery'>GALLERY</div> : ""
                }
                {
                    getAssets()
                }
            </div>
        </div>
    );

    function getAssets() {
        let assets = []
        for (let i=0; i<active_windows.length; i++) {
            let key = active_windows[i]
            let project = _.find(projects, ['id', key]);
            // IF PROJECT WINDOW 
            if(project) {
                // and is MOBILE
                if(isMobile) {
                    //VIDEOS & IMAGES 
                    assets = assets.concat(project.media.map(function(url, x) {
                        return (
                            <div>
                                <div key={"asset-" + key +x} >
                                    {isVideo(url) ? makeVideoMobile(project, url, x) : isPhoto(url) ? makePhotoMobile(project, url, x) : null}
                                </div>
                                <div className='caption'>{ASSET_CAPTIONS[url]}</div> 
                            </div>
                            )
 
                    }))
                }
            }
        }
        return assets;
    }

}

export default ProjectSummary;