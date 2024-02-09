import React, {useRef, useEffect} from 'react';
import { Player, ControlBar} from 'video-react';
import "./Video.css"
import $ from "jquery";

import {useMediaQuery} from "react-responsive";

function Video(props) {

    const {src_url, x, w, h, muted} = props
    const isMobile = useMediaQuery({ maxWidth: 767 })
    let width;
    let height;

    if (isMobile) {
        width = $(window).width()
        height = width * .66;
    }
    else {
        width = $(window).width() * .55
        height = width * .66;
    }

    let top = -height * .08 + 'px';

    if(w) {
        width =w;
        
    }
    if(h) {
        height =h;
        top = -height * .0 + 'px';
    }

    const vidRef=useRef();


    return (
        <div className={"Video"}
             style={(!isMobile) ? {
                 overflow: "hidden",
                 position: "relative",
                 left: "0%",
                 top: top,
             } : {
                overflow: "hidden",
                position: "relative",
                marginTop: "25px",
                marginBottom:"25px", 
             }}>
            <div>
                <Player
                    autoPlay
                    muted={muted || isMobile}
                    ref={ vidRef }
                    playsInline={true}
                    loop={true}
                    fluid={false}
                    videoHeight={height}
                    width={width}
                    height={height}
                    aspectRatio={"16:9"}
                >
                    <source src={src_url} />
                    <ControlBar 
                        disableCompletely={true}/>
                </Player>
            </div>
        </div>
    );
}

export default Video;


