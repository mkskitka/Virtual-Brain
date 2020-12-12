import Draggable from "react-draggable";
import React, {useEffect, useState} from 'react';
import './Record.css'
import {useSelector} from "react-redux";
import P5Wrapper from 'react-p5-wrapper';
import record_sketch from './Record';
import ReactAudioPlayer from 'react-audio-player';
import {useMediaQuery} from "react-responsive";

const record_style = {
    bottom:"50px",
    right: "50px",
    position: "absolute",
}
const record_close_button_style = {
    right:'-8px',
    top: '60px',
    position: 'absolute',
}

function RecordWrapper() {


    const active_song = useSelector(state=> state.active_song)
    const [stop, setStop] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const drag_disabled =  isTabletOrMobile;

    return (
        <Draggable disabled={drag_disabled}>
            <div id="record-wrapper" style={record_style}>
                <div id="close-button" style={record_close_button_style}
                     onClick={(e) => this.closeWindow(e, "record_player")}/>
                <div>
                    <div>
                        <P5Wrapper song={active_song} stop={stop} sketch={record_sketch}/>
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

