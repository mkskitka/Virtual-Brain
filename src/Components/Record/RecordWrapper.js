import Draggable from "react-draggable";
import React, {useState} from 'react';
import './Record.css'
import {useSelector} from "react-redux";
import { ReactP5Wrapper } from "react-p5-wrapper";
import record_sketch from './Record';
import ReactAudioPlayer from 'react-audio-player';
import {useMediaQuery} from "react-responsive";

let record_style = {
    bottom:"50px",
    right: "50px",
    position: "absolute",
}

function RecordWrapper() {


    const active_song = useSelector(state=> state.active_song)
    const [stop, setStop] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const drag_disabled =  isTabletOrMobile;

    if (isMobile) {
        record_style.right = '0px';
    }

    return (
        <Draggable disabled={drag_disabled}>
            <div id="record-wrapper" style={record_style}>
                <div>
                    <div>
                        <ReactP5Wrapper song={active_song} stop={stop} sketch={record_sketch}/>
                    </div>
                    <div style={{}}>
                        <ReactAudioPlayer
                            onPlay={playRecordPlayer}
                            onPause={pauseRecordPlayer}
                            onEnded={pauseRecordPlayer}
                            id={"audio-player"}
                            src={active_song}
                        />
                    </div>
                </div>
            </div>
        </Draggable>
    );

    function pauseRecordPlayer(){
        setStop(true)
        setStop(false)
    }

    function playRecordPlayer() {

    }
}

export default RecordWrapper;

