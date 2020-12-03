import React, { useEffect, useState } from 'react';
import { projects } from '../../Config/constants'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_ACTIVE_PROJECT } from "../../Redux/actions";
import "./ProjectDirectory.css"
import $ from "jquery"
import _ from "lodash"
let dir_height;
let dir_width;
let range

const projectCategories = ["ALL", "HCI", "NEW", "AI"]

function ProjectDirectory(props) {

    const dispatch = useDispatch()
    const config = props.config;
    const active_project = useSelector(state => state.active_project);
    const [projectCategory, setProjectCategory] = useState('ALL');


    useEffect(() => {

         $(".Project-Wrapper").fadeTo(1000, 1);
        return function cleanup() { dispatch({type: CHANGE_ACTIVE_PROJECT, project: null})};
    }, [])

    useEffect( () => {
        projectCategories.forEach(cat => {
                if (projectCategory.includes(cat)) {
                    $("#" + cat).addClass("Selected")
                }
                else {
                        $("#"+cat).removeClass("Selected")
                    }
            })
        }, [projectCategory]
    )

    let writeup = ""

    if(active_project !== null) {
        let project = _.find(projects, {id:active_project})
        if (typeof(project) !== "undefined") {
            writeup = project.writeup
        }
    }

    const project_list = projects.map(function(p) {
        if(projectCategory === "ALL" || p.tags.includes(projectCategory)) {
            return (
                <div key={p.id} id={p.id} className={"Project-Link" + " Project-Link" + p.id}
                     onClick={(e) => onFileClick(p.id)}>
                    <div key={p.title} id={"Project-Title" + p.id}
                         className={"Project-Title"}>{p.title.toUpperCase()}</div>
                    <div key={p.title + "_desc"} id={"Project-Description" + p.id}
                         className={"Project-Description"}>{p.description}</div>
                </div>
            );
        }
        else {
            return ""
        }
        });

    return (
        <div className={"Project-Wrapper"} style={{position: "relative"}}>
            {active_project !== null &&
            <div className={"Back-Button-Container"} style={{position: "fixed"}}>
                <div className={"Back-Button"} style={{top: "0px", zIndex: '10'}} onClick={backToMenu} />
                <div className={"Back-Button"} style={{top: "0px", position: "absolute"}}>
                    <svg width="25px" height="25px" >
                        <line x1="0" y1="12.5" x2="25" y2="0" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                        <line x1="0" y1="12.5" x2="25" y2="25" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                    </svg>
                </div>
            </div>
            }
                <div className={"Project-Menu"}>
                    <div id={'ALL'} onClick={() => setProjectCategory("ALL")}className={"Selected"}>ALL</div>
                    <div id={'HCI'} onClick={() => setProjectCategory("HCI")}>HCI</div>
                    <div id={'NEW'}  onClick={() => setProjectCategory("NEW MEDIA")}>NEW MEDIA</div>
                    <div id={'AI'}  onClick={() => setProjectCategory("AI")}>AI</div>
                </div>

        <div className={"Project-Directory-Content"}>{
             project_list}
            <div style={{top: "60px", width: "100%"}}> {
             ((active_project === null) ? "" :
                 <div style={{width: "100%"}}>
                     <div className={"Writeup"}> {
                         writeup
                     }</div>
                 </div>)
            }
             </div>

        </div>
        </div>
    );

    function backToMenu() {
        animateBackToMenu()
    }

    function onFileClick(id) {
        if(active_project === null) {
            projectSelectAnimation(id)
        }
    }

    function animateBackToMenu() {
        let project = _.find(projects, function(p) { return p.id === active_project; });
        dispatch({type: CHANGE_ACTIVE_PROJECT, project: null})

        $("#Project-Title"+active_project).css("color", '#0091ff');

        $("#Project-Title"+active_project).animate({fontSize: "20px"}, 1000)
        $("#" + active_project).animate({
            left: 0,
        }, 800)
        $(".Window-projects").animate({
            height: $(window).height() * .9,
        }, 1000, function () {
            $(".Window-projects").css("height", "90%");
        })
        $(".Window-projects").animate({
            width:  $(window).width() * .27
        }, 1000, function () {
            $(".Window-projects").css("width", "27%");
        })

        for(let i=0; i<projects.length; i++) {
            let p = projects[i];
            if(p.id !== active_project) {
                $("#" + p.id).animate({
                    opacity: '1',
                }, 3000);
            }
            else {
                    $("#" + active_project).animate({
                        top: "+=" + String(range),
                    }, 1000, function () {
                        $("#Window-Body-projects").css("overflowY", "scroll");
                        $(".Project-Menu").show()
                    });

            }
        }
    }

    function projectSelectAnimation(active_project) {

        $(".Project-Directory-Content").finish()
        $(".Window-projects").finish()
        $(".Project-Menu").finish()
        $(".Window-Body").finish()
        $(".Project-Title").finish()
        $(".Project-Link").finish()

        $(".Writeup").fadeTo(0, 0);

        $(".Window-Body").css("overflow", "hidden")
        $(".Project-Menu").hide()

        let project = _.find(projects, {id:active_project})
        $(".Window-projects").animate({
            height: project.writeup_y,
        }, 1000)
        if(typeof project.writeup_x !== "undefined") {
            $(".Window-projects").animate({
                width: project.writeup_x,
            }, 1000)
        }

        for(let i=0; i<projects.length; i++) {
            let p = projects[i];


            $("#" + p.id).finish()
            if(p.id !== active_project) {
                $("#" + p.id).animate({
                    opacity: '0',
                }, 1000)
            }
            else {
                    let top1 = $(".Window-projects").offset().top;
                    let top2 = $("#" + active_project).offset().top;
                    range = top2- top1-40;
                    $("#" + active_project).finish()
                    $("#" + active_project).animate({
                        top: "-=" + String(Math.round(range)),
                    }, 1000, function () {
                        $("#Project-Title"+active_project).animate({fontSize: "36px"}, 1000)

                        $("#Window-Body-projects").css("overflow", "hidden");
                        $("#" + active_project).animate({
                            left: 30,
                        }, 800, function () {
                            dispatch({type: CHANGE_ACTIVE_PROJECT, project: active_project})
                            $(".Back-Button-Container").css("top", top1)

                            $(".Writeup").finish()
                            let project = _.find(projects, function(p) { return p.id === active_project; });
                            console.log("proj",project)
                            if(project.title.length > 15) {
                                $(".Writeup").css("top", '100px');
                            }
                            else {
                                $(".Writeup").css("top", '50px');
                            }
                            $(".Writeup").fadeTo(700, 1)
                            $("#Project-Title"+active_project).finish()
                            $("#Project-Title"+active_project).css("color", "#00ffff");

                        })
                    });

            }
        }
        dir_height = $(".Window-projects").height()
        dir_width = $(".Window-projects").width()
     }
}

export default ProjectDirectory;