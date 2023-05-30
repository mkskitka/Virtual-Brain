import React, { useEffect } from "react";
import "./monster.css"
import $ from "jquery"
import Draggable from "react-draggable";

const TELEPORT_ROTATE = ['rotate(180deg)', 'rotate(90deg)', 'rotate(-90deg)', 'rotate(0deg)' ];
const TELEPORT_LEFT = ["50%", "0px", "90%", "20%"];
const TELEPORT_TOP = ["-20px", "20%", "70%", "77%"];

function Monster() {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setTimeout(function(){
            $( ".monster" ).animate({
                bottom: "-=" + String($(window).height()),
            }, 500, function() {});
            setTimeout(function () { blink() }, 3000)
            setTimeout(function () { teleport() }, 3000)
            setTimeout(function () { squat() }, 10000)
            // setTimeout(function () { lookleft() }, 10000)

            setTimeout(function(){$( ".monster" ).attr("src", "monster_fall.gif");}, 280)
            setTimeout(function(){$( ".monster" ).attr("src", "standing.png");}, 1000)
            setTimeout(function(){$( ".monster" ).css("bottom", "0px");}, 1000)

        }, 2000);
        $(document).keydown(function(e){
            console.log(e.which)
            switch (e.which){
                case 40:    //bottom arrow key
                    if($( ".monster" ).attr("src") !== "monster_fall.gif") {
                        $(".monster").attr("src", "monster_fall.gif");
                    }
                    break;
                default:
                    break;
            }
        });
        $(document).keyup(function(e){
            $( ".monster" ).attr("src", "standing.png");
        });
    }, []);

    function blink(){
        if($( ".monster" ).attr("src") === "standing.png") {
            $( ".monster" ).attr("src", "blink.gif");
            setTimeout(function(){ $( ".monster" ).attr("src", "standing.png");}, 600)
            let after = Math.floor(Math.random() * 6000) + 3000
            setTimeout(function(){blink()},  after);
        }
        else {
            let after = Math.floor(Math.random() * 6000) + 3000
            setTimeout(function(){blink()}, after);
        }
    }

    function teleport() {
        let transport_to = Math.floor(Math.random() * 4) + 1
        setTimeout(function () {
            $(".monster").css({'transform': TELEPORT_ROTATE[transport_to]});
            $(".monster").css("top", TELEPORT_TOP[transport_to]);
            $(".monster").css("left", TELEPORT_LEFT[transport_to]);
            $(".monster").attr("src", "standing.png");
        }, 2000);

        let after = Math.floor(Math.random() * 30000) + 15000
        setTimeout(function () {
            teleport();
        }, after)
    }

    function squat(){
        if($( ".monster" ).attr("src") === "standing.png") {
            $( ".monster" ).attr("src", "monster_fall.gif");
            setTimeout(function(){ $( ".monster" ).attr("src", "standing.png");}, 700)
            let after = Math.floor(Math.random() * 30000) + 20000
            setTimeout(function(){squat()}, after);
        }
        else {
            let after = Math.floor(Math.random() * 20000) + 20000
            setTimeout(function(){squat()}, after);
        }
    }

    return (
        <Draggable disabled={false}>
            <img alt={"monster-animation"} className="monster" src="standing.png"/>
            </Draggable>
        );

}

export default Monster;