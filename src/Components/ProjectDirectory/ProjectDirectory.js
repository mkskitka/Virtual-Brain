import React, {useEffect} from 'react';
import { projects } from '../../Config/constants'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_ACTIVE_PROJECT } from "../../Redux/actions";
import "./ProjectDirectory.css"
import $ from "jquery"
import _ from "lodash"
let dir_height;

function ProjectDirectory(props) {

    const dispatch = useDispatch()
    const config = props.config;
    const active_project = useSelector(state => state.active_project);

    useEffect(() => {
        return function cleanup() { dispatch({type: CHANGE_ACTIVE_PROJECT, project: null})};
    }, [])

    let writeup = ""

    if(active_project !== null) {
        let project = _.find(projects, {id:active_project})
        if (typeof(project) !== "undefined") {
            writeup = project.writeup
        }
    }

    const project_list = projects.map(function(p) {
        return(
            <div key={p.id} id={p.id} className="Project-Link" onClick={(e) => onFileClick(p.id)}>
                <div key={p.title} className={"Project-Title"}>{p.title.toUpperCase()}</div>
                <div key={p.title + "_desc"} className={"Project-Description"}>{p.description}</div>
            </div>);
        });

    return (
        <div className={"Project-Directory-Content"}>{
             project_list}
            <div style={{position: "absolute", top: "60px"}}> {
             ((active_project === null) ? "" :
                 <div>
                     <div style={{top: "-40px", position: "relative"}}>
                         <svg width="25px" height="25px" onClick={(e) => backToMenu(e)}>
                             <line x1="0" y1="12.5" x2="25" y2="0" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                             <line x1="0" y1="12.5" x2="25" y2="25" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                         </svg>
                     </div>
                     <div className={"writeup"}> {
                         writeup
                     }</div>
                 </div>)
            }
             </div>

        </div>
    );

    function backToMenu(e) {
        console.log("back to menu")
        animateBackToMenu(e)
    }

    function onFileClick(id) {
        if(active_project === null) {
            projectSelectAnimation(id)
        }
    }

    function animateBackToMenu(e) {
        dispatch({type: CHANGE_ACTIVE_PROJECT, project: null})
        $(".Project-Directory-Content").css("overflowY", "scroll");
        $("#" + active_project).animate({
            left: 0,
        }, 800)
        $(".Project-Directory-Content").animate({
            height: dir_height +"px"
        }, 1000)
        for(let i=0; i<projects.length; i++) {
            let p = projects[i];
            if(p.id !== active_project) {
                $("#" + p.id).animate({
                    opacity: '1',
                }, 3000);
            }
            else {
                setTimeout(function () {
                    $("#" + active_project).animate({
                        top: "+=" + String(60*(i)),
                    }, 1000);
                })
            }
        }
    }

    function projectSelectAnimation(active_project) {
        let project = _.find(projects, {id:active_project})
        $(".Project-Directory-Content").css("overflowY", "hidden");
        $(".Project-Directory-Content").animate({
            height: project.writeup_y,
        }, 1000)
        $(".writeup").fadeOut(0);
        for(let i=0; i<projects.length; i++) {
            let p = projects[i];
            if(p.id !== active_project) {
                $("#" + p.id).animate({
                    opacity: '0',
                }, 1000)
            }
            else {
                setTimeout(function () {
                    $("#" + active_project).animate({
                        top: "-=" + String(60*(i)),
                    }, 1000, function () {
                        $("#" + active_project).animate({
                            left: 40,
                        }, 800, function () {
                            dispatch({type: CHANGE_ACTIVE_PROJECT, project: active_project})
                            $(".writeup").animate({
                                opacity: "0"
                            }, 0)
                            $(".writeup").animate({
                                opacity: "1"
                            }, 1000)
                        })
                    });
                })
            }
        }
        dir_height = $(".Project-Directory-Content").height()
     }
}

export default ProjectDirectory;