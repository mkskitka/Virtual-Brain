import React, {useEffect} from 'react';
import { projects } from '../../Config/constants'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_ACTIVE_PROJECT } from "../../Redux/actions";
import "./ProjectDirectory.css"
import $ from "jquery"
import _ from "lodash"
let dir_height;
let dir_width;
let range

function ProjectDirectory(props) {

    const dispatch = useDispatch()
    const config = props.config;
    const active_project = useSelector(state => state.active_project);

    useEffect(() => {

         $(".Project-Wrapper").fadeTo(1000, 1);
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
            <div key={p.id} id={p.id} className={"Project-Link" +" Project-Link"+p.id}  onClick={(e) => onFileClick(p.id)}>
                <div key={p.title} id={"Project-Title"+p.id} className={"Project-Title"}>{p.title.toUpperCase()}</div>
                <div key={p.title + "_desc"} id={"Project-Description"+p.id} className={"Project-Description"}>{p.description}</div>
            </div>);
        });

    return (
        <div className={"Project-Wrapper"} style={{position: "relative"}}>
                <div className={"Project-Menu"}>
                    <div className={"Selected"}>ALL</div>
                    <div >{'UI'}</div>
                    <div >NEW MEDIA</div>
                    <div>AI</div>
                </div>
            {active_project !== null &&
                <div className={"Back-Button-Container"} style={{position: "fixed"}}>
                <div className={"Back-Button"} style={{top: "0px", zIndex: '1'}} onClick={backToMenu} />
                <div className={"Back-Button"} style={{top: "0px", position: "absolute"}}>
                <svg width="25px" height="25px" >
                    <line x1="0" y1="12.5" x2="25" y2="0" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                    <line x1="0" y1="12.5" x2="25" y2="25" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                </svg>
            </div>
                </div>}
        <div className={"Project-Directory-Content"}>{
             project_list}
            <div style={{position: "absolute", top: "60px"}}> {
             ((active_project === null) ? "" :
                 <div style={{position: "relative"}}>
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
        let p = _.find(projects, function(p) { return p.id === active_project; });
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
                            left: 40,
                        }, 800, function () {
                            dispatch({type: CHANGE_ACTIVE_PROJECT, project: active_project})
                            $(".Back-Button-Container").css("top", top1)
                            let top = ($("#" + active_project).height())

                            $(".Writeup").finish()
                            $(".Writeup").css("top", top-60);
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