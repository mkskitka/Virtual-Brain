import React, {useEffect} from 'react';
import Draggable from "react-draggable";
import { REMOVE_DIRECTORY_WINDOW } from "../../Redux/actions";
import './Window.css'
import {useDispatch} from "react-redux";

function Window(props) {

    const { config, content, id } = props;
    const dispatch = useDispatch()

    function closeWindow(e) {
        console.log("closing window ", id)
        dispatch({type: REMOVE_DIRECTORY_WINDOW, id: id});
    }

    useEffect(function() {
        console.log("window ", id, " mounting")
    }, [])

    return (

        <Draggable disabled={config.drag_disabled}>
            <div className={"Window"} style={{...config.style}}>
                    <div className={"Window-Header"}>
                        <div className="Close-Button" onClick={(e) => closeWindow(e)}>
                            <svg width="100%" height="100%">
                                <line x1="0" y1="0" x2="25" y2="25" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                                <line x1="25" y1="0" x2="0" y2="25" style={{stroke:config.style.borderColor, strokeWidth:'3'}} />
                            </svg>
                        </div>
                        <div className={"Window-Title"} key={"title"}>{config.title.toUpperCase()}</div>
                    </div>
                    <div className={"Window-Body"}>
                     {content}
                    </div>
            </div>
        </Draggable>
    );
}

const MemoizedWindow = React.memo(Window)
export default MemoizedWindow;
