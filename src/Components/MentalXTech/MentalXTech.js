import React, {useEffect, useRef} from 'react';
import "./MentalXTech.css"
import $ from "jquery"
import {block_questions, questions, color_questions} from "./Questions";
import * as d3 from "d3";
import { Dropdown } from 'semantic-ui-react'

var fact2 = "Would you feel comfortable discussing a mental health disorder with your direct supervisor(s)?";
var q2 = "Do you currently have a mental health disorder?";
var q3 = "Does your employer provide mental health benefits as part of healthcare coverage?";
var q4 = "Do you know the options for mental health care available under your employer-provided coverage?";
var q5 = "Have you observed or experienced an unsupportive or badly handled response to a mental health issue in your current or previous workplace?";
var q6 = "What is your gender?";
var q7 = "Do you feel that being identified as a person with a mental health issue would hurt your career?";
// RESET
var q8 = "Would you be willing to bring up a physical health issue with a potential employer in an interview?";
var q9 = "Would you bring up a mental health issue with a potential employer in an interview?";
var q10 = "Do you think that team members/co-workers would view you more negatively if they knew you suffered from a mental health issue?";

// GLOBALS
var vizData;
var colors = ["blue", "Teal", "purple", "white"];
var default_color = "grey";
var screen_width;
var screen_height;
var screen_ratio;
var viz_padding = 200;
var sqroot;  						// square root of the total number of data entries or rows
var block_x; 						// x coordinate of first dot in the viz
var block_y; 						// y coordinate of first dot in the viz
var total_time = 3000; 				// time between transitions
var duration = (2/5) * total_time;	// duration of transitions
var sm_circle;						// size of small circle
var selected_circle;				// size of selected circle
var dist; 							// dist between each circle
var opacity = .7					// opacity of each circle
var offset = -50;					// lol idk
var key_circle_radius = 10;			// radius of the key circles
var title_x;						// main title

/* variables used for multi-block mode */
var viz_sm_side;
var indv_width;
var num_nodesX;
var num_nodesY = [];
var multi_padding = 30;
var multi_greater = 200;
var multi_view = false;

var simple = true;  				// transitions simple or complex

/* The current questions and responses displayed on the viz */
var block_question = "";
var color_question = "Select Question to Color the Graph"
var block_response = [];

var color_response = ["Yes, I think it would", "No, I don't think it would", "Maybe", "Yes, it has"];


var block_x_by_resp = []; //holds the x values blocks
var index_by_resp = [];   //holds the response options
var resp2 = [];           // number of nodes per response

let cluster_options = color_questions.map((q, i) => {return { key: i, text: q, value: i }});
let color_options = block_questions.map((q, i) => {return { key: i, text: q, value: i }})


function MentalXTech() {

    const ref = useRef()


    useEffect(function () {
        $("#buttons").hide();
        $("#explain").css("opacity", 0);


        screen_width = $("#currentDisplay").width();;
        screen_height = $("#currentDisplay").height();
        screen_ratio = Math.max(screen_width, screen_height)/ Math.min(screen_width, screen_height);

        $(".Vis-Svg").width(screen_width);
        $(".Vis-Svg").height(screen_height);


        d3.select("#key").append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("id", "key_svg")
            .append("g")
            .selectAll("circles")
            .data(colors)
            .enter()
            .append("circle")
            .attr("class", "key_circle")
            .attr("fill", function(d) { return "transparent"})
            .attr("r", key_circle_radius)
            .attr("opacity", .8)
            .attr("cx" , function(d, i) { return 20;})
            .attr("cy",  function(d, i) { return 40 + (key_circle_radius*2+5)*i});

        loadVizData()

        return function cleanup() { $(".Window-Close-Buttonprojects").css("width", "25").css("height", "25")  };

    },[])

    console.log("color options", color_options)

    return (
        <div id="currentDisplay" >

            <div className={"Title"}>Employees in Tech Talk Mental Health</div>
            <div id="buttons">

                <div className="Question" id="block_q"/>
                <Dropdown
                    className={"Dropdown"}
                    placeholder='Select Question'
                    fluid
                    search
                    selection
                    onChange={change_block_question}
                    options={cluster_options}
                />

                <div id={"divider"}/>

                {/*<label>Choose your a question to Color the chart</label>*/}

                <div className="Question" id="color_q">
                    Select Question to Color the Graph
                </div>

                <Dropdown
                    className={"Dropdown"}
                    placeholder='Select Question'
                    fluid
                    search
                    selection
                    onChange={change_color_question}
                    options={color_options}
                />
                <div style={{height: '150px', width: "350px"}} id="key"></div>

                <div id="explain"/>
            </div>
        <svg className={"Vis-Svg"} ref={ref} onClick={(e) => onSvgClick(e)}>


        </svg>
        </div>
    );

    function onSvgClick(e) {
        e.preventDefault()
    }

    /* loads the data*/
    function loadVizData() {
        console.log("loading viz data")
        d3.csv("data1.csv").then(function(data) {

            console.log("d3 data: ", data)
            vizData = data;

            viz_sm_side = Math.min(screen_width, screen_height) - viz_padding;
            sqroot = Math.round(Math.sqrt(vizData.length));
            sm_circle = viz_sm_side/((sqroot*4));
            selected_circle = sm_circle * 1.5;
            dist = sm_circle * 3;
            block_x = $("#currentDisplay").width()/2 - viz_sm_side/2 + 50;
            block_y = $("#currentDisplay").height()/2 - viz_sm_side/2;

            // reset_single();
            // initialize_graph();
            // factor_recolor(color_question, color_response);
            animate();

        });
    }

    /* control flow for viz
       can make this centralized control flow using promises */
    function animate() {
        reset_single();
        show_metric(1000);
    }

    /* populates viz nodes randomly */
    function initialize_graph() {
        show_metric(0);
    }

    function populate() {
        const svgElement = d3.select(ref.current)

        svgElement.selectAll("circle")
            .data(vizData)
            .transition()
            .duration(total_time)
            .attr("cx", function(d) { return d.x - offset})
            .attr("cy", function(d) { return d.y});


        d3.selectAll(".key_circle")
            .attr("fill", function(d, i) {if(i < index_by_resp.length) { return d; }
            else {return "transparent"}});

        d3.select("#key_svg").select("g")
            .selectAll("text")
            .data(colors)
            .join("text")
            .text(function(d, i) {if(i < index_by_resp.length){ return color_response[i]}
            else {return ""}})
            .attr("x", 60)
            .attr("y", function(d, i) {return 40 + (key_circle_radius*2+7)*i})
            .style("fill", "white");


        if(block_response.length > 1){
            svgElement
                .selectAll("text")
                .data(block_response)
                .join("text")
                .attr("id", "b_resp")
                .style("font-size", "12px")
                .text(function(d, i) {
                    return block_response[i];
                })
                .attr("x", function(d, i) {return title_x+multi_padding+dist*3 - ((indv_width+multi_padding)*((block_response.length-1) -i) -5)})
                .attr("y", viz_padding/3)
                .style("fill", "white");
        }
        else {
            console.log("no headers")
            $("#b_resp").remove()
            $("#block_q").text("Select Question to Cluster Graph");

        }
    }



    function factor_recolor (question, response) {
        index_by_resp.length = response.length;

        for(let i = 0; i < block_x_by_resp.length; i++) {   //i = block number
            index_by_resp[i] = new Array(response.length);
            index_by_resp[i].fill(1);
        }

        //sets the correct index per response type
        const svgElement = d3.select(ref.current)

        svgElement.selectAll("circle")
            .transition()
            .duration(1000)
            .attr("r",
                function(d){
                    for (var i = 0; i < resp2.length; i++){ //cluster response
                        for (var j = 0; j < response.length; j++){ //color response
                            if (d[question] === response[j] && ((multi_view == false) || (d.resp2 == i))) {
                                d.new_i = index_by_resp[i][j];
                                d.resp = j;
                                index_by_resp[i][j] = index_by_resp[i][j] + 1;
                                return sm_circle;
                            }
                        }
                    }
                });

        //sets the color, the x and the y value
        for(let i = 0; i < block_x_by_resp.length; i++){
            let index_accum = 0;
            for(let j = 0; j < response.length; j++){
                svgElement.selectAll("circle")
                    .attr("r",
                        function(d) {
                            if(d.resp == j && ((multi_view == false) || (d.resp2 == i))){
                                d.color = colors[j];
                                d.x = block_x_by_resp[i] + (((index_accum + d.new_i) % sqroot) * dist) - offset;
                                d.y = block_y + (Math.floor((d.new_i+index_accum)/sqroot) * dist);
                                if(d.new_i == 1 && d.color == colors[0]){
                                    title_x = d.x;
                                }
                            }
                            return sm_circle;
                        });

                index_accum += index_by_resp[i][j];
            }
        }

         recolor();
    }


    function recolor() {

        const svgElement = d3.select(ref.current)

        svgElement.selectAll("circle")
            .transition()
            .duration(duration)
            .style("fill", function(d) {
                return d.color;

            })
        setTimeout(function() {
            populate();
        }, duration);
    }


    function group_by_factor(question, response) {

        const svgElement = d3.select(ref.current)
        multi_view = true;
        resp2.length = response.length;
        resp2.fill(1);
        //individual width of node
        indv_width = (viz_sm_side+multi_greater)/response.length-multi_padding;
        //number of nodes on x axis per cluster
        num_nodesX = Math.round(indv_width/dist)
        sqroot = num_nodesX;

        svgElement.selectAll("circle")
            .attr("r", function(d) {
                for (var i = 0; i < response.length; i++){
                    if (d[question] == response[i]) {
                        d.resp2 = i;
                        // Here we are counting how many nodes of each cluster we have
                        resp2[i] = resp2[i] + 1;
                        return sm_circle;
                    }
                }
            })

        for(var i = 0; i< resp2.length; i++) {
            num_nodesY[i] = resp2[i]/num_nodesX;
        }

        var accum = screen_width/2 - (viz_sm_side+multi_greater)/2 +100;

        for(var i = 0; i < response.length; i++) {
            // X starting coord for each block
            block_x_by_resp[i] = accum + ((indv_width+multi_padding) * i);
        }

        factor_recolor(color_question, color_response);

    }


    function reset_single() {
        sqroot = Math.round(Math.sqrt(vizData.length));
        multi_view = false;
        block_x_by_resp.length = 1;
        block_x_by_resp.fill(block_x)
        resp2.length = 1;
    }

    /************************************************************************************************

     MOUSE EVENTS

     ************************************************************************************************/

    function change_block_question(e, data) {
        let q = data.options[data.value].text
        console.log("change block q" , q)
        block_response = questions[q];
        group_by_factor(q, questions[q]);
    }

    function change_color_question(e, data) {
        let q = data.options[data.value].text
        console.log("change color q" , q)
        color_response = questions[q];
        factor_recolor(q, questions[q]);
    }

  function nodeMouseOver(d, i) {

        console.log(d);
        d3.select(this)
            .attr("r", selected_circle)
            .style("opacity", opacity);

        var g = d3.select(this).append("g");
        g.append("rect")
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("width", 160)
            .attr("height", 100)
            .attr("fill", "white");

        g.append("text")
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("dy", ".35em")
            .text(String(d[fact2]))
            .style("fill", "white");
    }

    function nodeMouseOut(d, i) {

        d3.select(this)
            .attr("r", sm_circle)
            .style("opacity", opacity);
        d3.select(this).selectAll("g").remove();

    }


    function show_metric(time) {


        var svg = d3.select(ref.current);
        svg.append("text").html('--- One Person')
            .attr("x", $("#currentDisplay").width()/2 + 60)
            .attr("y", $("#currentDisplay").height()/2)
            .style("fill", "white");

        svg.append("circle")
            .attr("id", "vizCircle")
            .attr("cx", function() { return $("#currentDisplay").width()/2})
            .attr("cy", function() { return $("#currentDisplay").height()/2 })
            .attr("r", 50)
            .style("opacity", opacity)
            .style("fill", colors[0])
            .transition()
            .duration(duration)
            .attr("r", sm_circle)
            .transition()

        svg.append("text")
            .attr("id", "num_people")
            .html('of 1100 People Employed in Tech Companies in the United States')
            .attr("x", $("#currentDisplay").width()/2 -300)
            .attr("y", $("#currentDisplay").height()/2 -100)
            .style("opacity", 0)
            .transition()
            .delay(2000)
            .duration(1000)
            .ease(d3.easeLinear).style("opacity", 1)
            .style("fill", "white");

        setTimeout(function(){
            random_populate();
        }, total_time +1000);

    }

    /* populates viz nodes randomly */
    function random_populate() {

        const svgElement = d3.select(ref.current)

        svgElement.selectAll("circle")
            .data(vizData)
            .join("circle")
            .attr("cx", function() { return Math.random() * $("#currentDisplay").width()-10 })
            .attr("cy", function() { return Math.random() * $("#currentDisplay").height()-10 })
            .attr("r", sm_circle)
            .style("fill", default_color)
            .style("opacity", 0)
            .on("mouseover", nodeMouseOver)
            .on("mouseout", nodeMouseOut)
            .transition()
            .duration( function(d, i) {
                return 200 * i/100})
            .ease(d3.easeLinear).style("opacity", opacity)
            .attr("r", sm_circle);

        setTimeout(function(){
            const svgElement = d3.select(ref.current)
            svgElement.selectAll("text")
                .remove();
            $("#buttons").fadeIn();
            block_populate();

        }, total_time);
    }

    /* populates viz into a square grid */
    function block_populate() {

        $("#buttons").show();
        const svgElement = d3.select(ref.current)

        svgElement.selectAll("circle")
            .attr("r", function(d, i) { d.x = block_x + ((i % sqroot) * dist) - offset; return sm_circle;})
            .attr("r", function(d, i) { d.y = block_y + (Math.floor(i/sqroot) * dist); return sm_circle;});

        populate();

    }

    function color_key(x) {
        d3.selectAll(".key_circle")
            .attr("r", function(i){if(i>x){return 0 }
            else {return key_circle_radius;}})
            .transition()
            .duration(1000)
            .delay(0)
            .attr("r", key_circle_radius)
            .attr("fill", function(d, i) {
                return d;

            });

        d3.select("#key_svg").select("g")
            .append("text")
            .transition()
            .delay(1000)
            .text( function(d, i) {return color_response[x]})
            .attr("x", 60)
            .attr("y", function(d, i) {return 40+(key_circle_radius*2+7)*x})
            .style("fill", "white");

    }


}

export default MentalXTech;





