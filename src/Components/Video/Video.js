import React, { useEffect} from 'react';
import { Player, ControlBar} from 'video-react';
import "./Video.css"

import {useSelector} from "react-redux";

function Video(props) {

    const active_project = useSelector(state => state.active_project)
    const {config} = props

    useEffect(() => {

    }, [active_project])

    return (
        <div className={"Video"}
             style={{
                 overflow: "hidden",
                 position: "absolute",
                 left: config.left,
                 top: config.top,
             }}>
            <div>
                <Player
                    autoPlay
                    muted={false}
                    playsInline={false}
                    loop={true}
                    fluid={false}
                    videoHeight={500}
                    width={config.width}
                    height={config.height}
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


