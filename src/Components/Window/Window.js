import React, {useEffect} from 'react';
import Draggable from "react-draggable";
import {REMOVE_DIRECTORY_WINDOW} from "../../Redux/actions";
import './Window.css'
import {useDispatch} from "react-redux";
import $ from 'jquery'
import {useMediaQuery} from "react-responsive";
import {video_window_template} from "../../Config/style_templates"

const defaultConfigs = {
    "xH": 25, // x button height
    "xS": 3,  // x button thickness
    ...video_window_template,
}

function Window(props) {

    let { config, content, project, id, x } = props;
    if(!config) {
        config = defaultConfigs
    }
    const dispatch = useDispatch()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const drag_disabled =  isTabletOrMobile;

    function closeWindow(e) {
        console.log("closing window!")
        dispatch({type: REMOVE_DIRECTORY_WINDOW, id: id});
    }

    let xH = getV(config, "xH")
    let xS = getV(config, "xS")

    let width = config.style.width;
    let height = config.style.height;
    let position = config.style.position;

    useEffect(() => {
    }, [])

    if(config.video_aspect_ratio) {
      //MOBILE
      if (isMobile) {
          width = $(window).width();
          height = $(window).width() * .55;
          config.style.left = "0%";
          config.style.top = "0%";
          position = "relative";
      }
      //DESKTOP
      else {
          width = $(window).width() * width * 1.1;
          height = width * .55;
          if(project.media_dimensions) {
            let media_dim = project.media_dimensions[x].split(":");
            width = $(window).width() * parseFloat(media_dim[2]);
            height = width * (media_dim[1]/media_dim[0])
          }
          if(project.left_top) {
            let left_top = project.left_top[x].split(":");
            config.style.left = left_top[0]
            config.style.top = left_top[1]
          }
      }
    }
    if(isMobile && id==="projects") {
        width = $(window).width();
    }

    return (

        <Draggable disabled={config.drag_disabled || drag_disabled}>
            <div className={"Window Window-"+id} key={"Window"+id+x} style={{
                            ...config.style, 
                            
                            width: width, 
                            height: height, 
                            position: position}}>
                    <div className={"Window-Header"} id={"Window-Header-"+id+x} style={(config.header) ? null : {height: '0px'} }>
                        <div onClick={closeWindow} className={"Close-Button"} style={{width: xH, height: xH, zIndex: 1}}></div>
                        <div  className="Close-Button" style={{width: xH, height: xH}} >
                            <svg className={"Window-Close-button"} id={"Window-Close-button"+id+x} width="100%" height="100%" >
                                <line x1="0" y1="0" x2={xH} y2={xH} style={{stroke:config.style.borderColor, strokeWidth:xS}} />
                                <line x1={xH} y1="0" x2="0" y2={xH} style={{stroke:config.style.borderColor, strokeWidth:xS}} />
                            </svg>
                        </div>
                        <div style={(config.titleStyle) ? config.titleStyle : null} className={"Window-Title"}
                             key={"title"+id+x}>{config.title.toUpperCase()}</div>
                    </div>
                    <div className={"Window-Body"} id={"Window-Body-"+id} style={config.bodyStyle} >
                     {content}
                    </div>
            </div>
        </Draggable>
    );

    function getV(config, v) {
        if(config[v]) {
            return config[v]
        }
        else
            return defaultConfigs[v]
    }
}


export default Window;
