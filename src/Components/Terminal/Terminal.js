import React, { useEffect } from 'react';
import Terminal from 'terminal-in-react';
import pseudoFileSystemPlugin from 'terminal-in-react-pseudo-file-system-plugin';
import {dirStructure} from "../../Config/directoryStructure";
import "./Terminal.css"

import $ from "jquery";

const FileSystemPlugin = pseudoFileSystemPlugin(dirStructure);


const terminal_style = {
    position: "relative",
    backdropFilter: 'blur(4px)',
    top: "-60px",
}

function TerminalT() {

    useEffect(() => {
        $("#terminal_comm").mouseup(function (e) {
            $("#terminal_comm").focus();
        });
    }, [])


    return (
                <div id="terminal_comm" style={terminal_style}>
                    <Terminal
                        watchConsoleLogging={false}
                        color='#03ecfc'
                        backgroundColor='rgba(0, 0, 0, .2)'
                        barColor='black'
                        fontFamily={"Quicksand, sans-serif !important"}
                        promptSymbol='>'
                        plugins={[
                            FileSystemPlugin,
                        ]}
                        style={{color: "blue !important"}}
                        commands={{
                            's': (print) => {print("\nACCESS DENIED.\n")},
                        }}
                        descriptions={{
                        }}
                        msg={""}
                    />
            </div>);

}

export default TerminalT;