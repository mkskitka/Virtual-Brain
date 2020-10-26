import React, {useEffect} from 'react';
import Draggable from "react-draggable";
import { REMOVE_DIRECTORY_WINDOW } from "../../Redux/actions";
import './Window.css'
import {useDispatch} from "react-redux";

const defaultConfigs = {
    "xH": 25, // x button height
    "xS": 3,  // x button thickness
}

function Window(props) {

    const { config, content, id } = props;
    const dispatch = useDispatch()

    function closeWindow(e) {
        console.log("closing window!")
        dispatch({type: REMOVE_DIRECTORY_WINDOW, id: id});
    }

    useEffect(function() {
        console.log("mounting window ", id)
    }, [])


    let xH = getV(config, "xH")
    let xS = getV(config, "xS")

    return (

        <Draggable disabled={config.drag_disabled}>
            <div className={"Window Window-"+id} key={"Window"+id} style={{...config.style}}>
                    <div className={"Window-Header"} id={"Window-Header-"+id} style={(config.header) ? null : {height: '0px'} }>
                        <div onClick={closeWindow} className={"Close-Button"} style={{width: xH, height: xH, zIndex: 1}}></div>
                        <div  className="Close-Button" style={{width: xH, height: xH}} >
                            <svg className={"Window-Close-button"} id={"Window-Close-button"+id} width="100%" height="100%" >
                                <line x1="0" y1="0" x2={xH} y2={xH} style={{stroke:config.style.borderColor, strokeWidth:xS}} />
                                <line x1={xH} y1="0" x2="0" y2={xH} style={{stroke:config.style.borderColor, strokeWidth:xS}} />
                            </svg>
                        </div>
                        <div className={"Window-Title"} key={"title"+id}>{config.title.toUpperCase()}</div>
                    </div>
                    <div className={"Window-Body"} id={"Window-Body-"+id} style={config.bodyStyle} >
                     {content}
                    </div>
            </div>
        </Draggable>
    );

    function getV(config, v) {
        if(typeof(config[v]) !== "undefined") {
            return config[v]
        }
        else
            return defaultConfigs[v]
    }
}


export default Window;
