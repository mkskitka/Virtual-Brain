import React, { useEffect} from 'react';
import { Player, ControlBar} from 'video-react';
import "./Video.css"
import $ from "jquery";

import {useSelector} from "react-redux";

function Video(props) {

    const active_project = useSelector(state => state.active_project)
    const {config} = props

    let width = $(window).width() * config.percent_of_screen_width
    let height = width * .66;
    let top = -height * .08 + 'px';

    return (
        <div className={"Video"}
             style={{
                 overflow: "hidden",
                 position: "absolute",
                 left: config.left,
                 top: top,
             }}>
            <div>
                <Player
                    autoPlay
                    muted={false}
                    playsInline={false}
                    loop={true}
                    fluid={false}
                    videoHeight={height}
                    width={width}
                    height={height}
                    aspectRatio={"16:9"}
                >
                    <source src={config.src_path} />
                    <ControlBar disableCompletely={true} />
                </Player>
            </div>
        </div>
    );
}

export default Video;


