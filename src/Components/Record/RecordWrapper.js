import Draggable from "react-draggable";
import React, {useEffect} from 'react';
import './Record.css'
import {useSelector} from "react-redux";
import P5Wrapper from 'react-p5-wrapper';
import record_sketch from './Record';
import ReactAudioPlayer from 'react-audio-player';

const record_style = {
    top:"0px",
    right: "20%",
    position: "absolute"
}
const record_close_button_style = {
    right:'-8px',
    top: '60px',
    position: 'absolute',
}

function RecordWrapper() {

    useEffect(function() {
        console.log("record mounting")
    }, [])

    const active_song = useSelector(state=> state.active_song)

    return (
        <Draggable>
            <div id="record-wrapper" style={record_style}>
                <div id="close-button" style={record_close_button_style}
                     onClick={(e) => this.closeWindow(e, "record_player")}/>
                <div>
                    <div>
                        <P5Wrapper sketch={record_sketch}/>
                    </div>
                    <div style={{}}>
                        <ReactAudioPlayer
                            onPlay={playRecordPlayer}
                            onPause={pauseRecordPlayer}
                            id={"audio-player"}
                            src={active_song}
                        />
                    </div>
                </div>
            </div>
        </Draggable>
    );

    function pauseRecordPlayer(){
        console.log("pausing record in app.js")
        this.setState({play: false, next: false, pause: true});
    }

    function playRecordPlayer() {
        let {play} = this.state;
        if(play) {
            console.log("next song!")
            this.setState({play: false, next: true, pause: false, album_art: "sheldon.png"});
        }
        else {
            console.log("play!")
            this.setState({next: false, play: true, pause: false});
        }
    }
}

export default RecordWrapper;

