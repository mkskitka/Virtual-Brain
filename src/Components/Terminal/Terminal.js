import React, { useEffect } from 'react';
import Terminal from 'terminal-in-react';
import pseudoFileSystemPlugin from 'terminal-in-react-pseudo-file-system-plugin';
import $ from "jquery";

const FileSystemPlugin = pseudoFileSystemPlugin();


const terminal_style = {
    position: "relative",
    backdropFilter: 'blur(4px)',
    top: "-60px",

}

function TerminalT() {

    useEffect(() => {
        console.log("Terminal Mounts")
        $("#terminal_comm").mouseup(function (e) {
            $("#terminal_comm").focus();
        });
    }, [])


    return (
                <div id="terminal_comm" style={terminal_style}>
                    <Terminal
                        watchConsoleLogging={false}
                        color='#ff00ff'
                        backgroundColor='rgba(0, 0, 0, .2)'
                        barColor='black'
                        fontFamily={"Quicksand, sans-serif !important"}
                        promptSymbol='>_'
                        plugins={[
                            FileSystemPlugin,
                        ]}
                        style={{fontWeight: "normal", font: "sans-serif", fontSize: "1em"}}
                        commands={{
                        }}
                        descriptions={{
                        }}
                        msg={""}
                    />
            </div>);

}

export default TerminalT;