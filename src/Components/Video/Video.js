import React, { useEffect} from 'react';
import { Player, ControlBar} from 'video-react';
import "./Video.css"
import $ from "jquery";

import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";

function Video(props) {

    const {config} = props
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isMobile = useMediaQuery({ maxWidth: 767 })
    let width;
    let height;

    if (isMobile) {
        width = $(window).width()
        height = width * .66;
    }
    else {
        width = $(window).width() * config.percent_of_screen_width
        height = width * .66;
    }

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


