
let active_song = "";

// general constants
let slow = 0;
const width = 390
const height =250

// init constants

const MOVE_UP = 1;
const MOVE_ACROSS = 2;
const MOVE_DOWN = 3;
const FINISHED = 4;
const NONE = 0;

const STYLUS_PACE = [0, .15, .11, .13]
let CURRENT_STYLUS_ACTION = NONE

let currently_playing = false;
let record_spinning = false;

// record constants
let record_x_total = 0;
let record_z = 0;
let record_x = 0;
let depth_increment = 0;    // ***
let x_increment = 0;        // ***
let angle_increment = 0;    // ***
let record_angle = 0;
const depth_max = 70;

// record arm constants
let record_arm_x_increment = 0;  // ***
let record_arm_x_total = 0;
let record_arm_x_max = 2;
let record_arm_x_rotate = 0;


let record_arm_y_increment = 0; // ***
const record_arm_y_max = 7;
let record_arm_y_total = 0;
let record_arm_y_rotate = 0;

// button variables

let button_clicked = false;
let button_height = 10;
let button_increment = .5;
let button_down = false;


export default function record_sketch (p, canvasParentRef) {


    p.setup = function () {
        p.createCanvas(width, height, p.WEBGL).parent(canvasParentRef);
    };

    p.mouseClicked = function () {
        if(p.mouseY > 170 && p.mouseY < 200 && p.mouseX > 315 && p.mouseX < 370) {
            if(CURRENT_STYLUS_ACTION === NONE) {
                button_clicked = true;
                button_down = true;
            }
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if(props.song !== active_song){
            active_song = props.song
            next()
        }
        if(props.stop) {
            stop()
        }
    };

    function start() {
        angle_increment = 2;  //Start record
        record_spinning = true;
        CURRENT_STYLUS_ACTION = MOVE_UP
    }
    function stop() {
        angle_increment = 0;  //Stop record
        record_spinning = false;
        currently_playing = false;
        document.getElementById("audio-player").pause();
        CURRENT_STYLUS_ACTION = MOVE_UP
    }
    function next() {
        let wait = 1000
        if(record_spinning) {
            stop()
            wait = 3000
        }
        setTimeout(function() {
            record_x_total = 0;
            depth_increment = 1
            angle_increment= 0;
            x_increment = 1.4;
        }, wait)
    }

    p.draw = function () {

        // SETTINGS

        p.angleMode(p.DEGREES);
        p.background(10, 0)
        p.stroke(255)
        p.strokeWeight(.5)
        p.rectMode(p.CENTER);
        p.lights()


        // TURNTABLE

        p.push()
        p.translate(0, 30, -200)
        p.rotateX(50)
        p.strokeWeight(1.5)
        p.noLights()
        p.stroke(255, 0, 238)
        p.fill(255, 0, 238, 50)

        p.box(500, 300, 40);
        p.pop()

        // RECORD

        p.push();

        p.translate(0, 0, record_z)
        record_z += depth_increment;
        p.rotateX(60)
        p.rotateX(record_x);
        record_x += x_increment;
        record_x_total += Math.abs(x_increment);
        p.rotateZ(record_angle);
        record_angle += angle_increment;
        p.fill(20)

        for(let i=12; i>2; i--) {
            p.stroke(150,150,150)
            p.strokeWeight(1)
            if(i===3) {
                p.strokeWeight(3)
                p.stroke(207, 255, 4) // neon yellow
            }
            else {
                p.strokeWeight(.5)
            }
            p.ellipse(0, 0, 134/3+(i*12), 140/3+(i*12));
        }
        p.stroke("#fffbe8")
        p.fill("#fffbe8")

        // A SIDE

        p.push()
        p.translate(0, 0, 1);
        p.push()
        p.ellipse(0, 0, 134/3+(3*12) - 13 , 140/3+(3*12) - 13);
        p.pop()
        p.stroke(0);
        p.fill(20);
        p.translate(0, 0, 1);
        p.ellipse(0, 0, 134/20, 140/20);
        p.pop()

        // B SIDE

        p.push()
        p.translate(0, 0, -1);
        p.push()
        p.ellipse(0, 0, 134/3+(3*12) - 13 , 140/3+(3*12) - 13);
        p.pop()
        p.stroke(0);
        p.fill(20);
        p.translate(0, 0, -1);
        p.ellipse(0, 0, 134/20, 140/20);
        p.pop()

        p.pop();

        //RECORD POINTER

        p.push();

        p.translate(160, -50, -100);
        p.strokeWeight(1)
        p.stroke(255, 55, 0)
        p.fill(255, 55, 0, 150)
        p.rotateX(-20)
        p.rotateY(-18)

        p.rotateX(record_arm_x_rotate)
        p.rotateY(record_arm_y_rotate)

        record_arm_x_total += Math.abs(record_arm_x_increment)
        record_arm_y_total += Math.abs(record_arm_y_increment)

        record_arm_x_rotate += record_arm_x_increment
        record_arm_y_rotate += record_arm_y_increment

        // RECORD ARM

        p.translate(-15, 0, 100)
        p.box(10, 10, 200)

        // NEEDLE

        p.stroke(255, 55, 0)
        p.line(0, 2, 95, 0, 15, 95)

        // FRICTION ANIMATION

        p.stroke(225, 225, 153);
        let x1 = -2;  let y1 = 0;  let x2 = -2;  let y2 = 14;
        p.translate(1, 10, 100)
        p.strokeWeight(1.5);

        if(currently_playing) {
            let xt = p.lerp(x1, x2, slow / 2 % 1);
            let yt = p.lerp(y1, y2, slow / 2 % 1);
            p.line(x1, y1, xt, yt);
            p.line(4, 0, p.lerp(4, 10, slow / 3 % 1), p.lerp(0, 25, slow / 3 % 1));
            p.line(-8, 0, p.lerp(-8, -14, slow / 5 % 1), p.lerp(0, 22, slow / 5 % 1));
            p.line(6, -2, p.lerp(6, 22, slow / 4 % 1), p.lerp(-2, 1, slow / 4 % 1));
            p.line(-15, -2, p.lerp(-15, -25, slow / 3 % 1), p.lerp(-2, 1, slow / 3 % 1));
        }
        slow += .08;

        p.pop();

        // BOX (play/pause) BUTTON

        p.push();

        p.lights()
        p.translate(135, 57, 10);
        p.strokeWeight(1)
        p.rotateZ(-15)
        p.stroke(255, 0, 238)
        p.fill(0, 90)
        p.rotateX(-20)
        p.rotateY(-18)
        p.box(30, button_height, 30)

        p.pop();


        if(button_clicked) {
            if(button_down) {
                if (button_height <= 0) {
                    button_down = false;
                }
                button_height -= button_increment
            }
            else {
                button_height += button_increment
            }
            if(button_height === 10) {
                button_clicked = false;
                if(record_spinning) {
                    stop()
                }
                else {
                    start()
                }
            }
        }

        // RECORD FLIP CONDITIONALS

        if (record_z === depth_max) {
            depth_increment = -1;
        }
        if (record_z === 0) {
            depth_increment = 0;
        }
        if(record_x_total >= 180) {
            x_increment = 0;
            record_x_total = 0;
            depth_increment = 0

            start()
        }

        //STYLUS MOTION CONDITIONALS

        if(CURRENT_STYLUS_ACTION === MOVE_UP) {
            record_arm_x_increment = STYLUS_PACE[MOVE_UP]
        }
        if(CURRENT_STYLUS_ACTION === MOVE_ACROSS) {
            if(record_spinning){
                record_arm_y_increment = -STYLUS_PACE[MOVE_ACROSS]
            }
            else {
                record_arm_y_increment = STYLUS_PACE[MOVE_ACROSS]
            }
        }
        if(CURRENT_STYLUS_ACTION === MOVE_DOWN) {
            record_arm_x_increment = -STYLUS_PACE[MOVE_DOWN]
        }

        if(record_arm_x_total > record_arm_x_max) {
            record_arm_x_total = 0
            record_arm_x_increment = 0;
            CURRENT_STYLUS_ACTION += 1
            console.log("moving onto next action: ", CURRENT_STYLUS_ACTION)
        }
        if(record_arm_y_total > record_arm_y_max) {
            record_arm_y_total = 0
            record_arm_y_increment = 0;
            CURRENT_STYLUS_ACTION += 1
            console.log("moving onto next action: ", CURRENT_STYLUS_ACTION)
        }
        if(CURRENT_STYLUS_ACTION === FINISHED) {
            CURRENT_STYLUS_ACTION = NONE;
            if(record_spinning) {
                currently_playing = true;
                document.getElementById("audio-player").play(false)
            }
        }


    };
};


