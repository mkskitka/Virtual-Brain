import React, {useEffect} from 'react';
import $ from "jquery"
import './Resume.css';
import {useSelector} from "react-redux";



function Resume() {

    const record_open = useSelector(state=> state.record_open);
    
    useEffect(function() {
        $(".Resume-Background").css("backgroundImage", "url(/color-static.gif)");
        $(".Resume-Background").height($(".Resume-Content").height()+50);
        $(".Resume-Content").fadeOut(0);
        if(record_open) {
            let left =  $("#record-wrapper").offset().left
            let to_left =$(window).width() - left - 450
            let top =  $("#record-wrapper").offset().top
            let to_top =$(window).height() - top - 300
                $("#record-wrapper").animate({
                left: "+="+String(to_left),
                top: "+="+String(to_top),
            })

        }
        setTimeout(function () {

            $(".Resume-Content").fadeIn(500);
            changeBrightness(.8);
        }, 1000)
    }, []);

    function changeBrightness(opacity) {
        $(".Resume-Content").css("opacity", opacity);
        let after = Math.floor(Math.random() * 2000) + 500;
        let newOpacity = (Math.floor(Math.random() * 100) + 70)/100;
        setTimeout(function(){changeBrightness(newOpacity)}, after)
    }
    return (
        <div className={"Resume-Wrapper"} >
            <div className={"Resume-Background"} />
            <div className={"Resume-Content"} >
                <div>Mary Kate Skitka</div>

                <div className='resume-heading mfont'>Education</div>
                <div className='group'>
                <div className='left-align mfont'>New York University, Interactive Telecommunications Program</div>
                <div className='right-align mfont'>May 2023</div>
                <div className='full-line mfont'>Master of Professional Studies</div>
                </div>
                <div className='space'/>
                <div className='group'>
                <div className='left-align mfont'>Tufts University</div>
                <div className='right-align mfont'>May 2018</div>
                <div className='full-line mfont'>Bachelor of Science in Cognitive Brain Science and Computer Science</div>
                </div>

                <div className='resume-heading mfont'>Experience</div>

                <div className='group'>
                <div className='left-align mfont'>Creative Technologist Freelancer, Brooklyn NY</div>
                <div className='right-align mfont'>September 2022 - Present</div>
                </div>
                <div className='space'/>
                <div className='group'>
                <div className='full-line mfont'>New York University, Brooklyn NY</div>
                <div className='left-align mfont'>&emsp;Coding Lab Student Lead</div>
                <div className='right-align mfont'>September 2022 - May 2023</div>
                <div className='left-align mfont'>&emsp;Coding Lab Mentor</div>
                <div className='right-align mfont'>September 2021 - May 2023</div>
                <div className='left-align mfont'>&emsp;Graduate Teaching Assistant for Creative Computation</div>
                <div className='right-align mfont'>September 2021 - January 2022</div>
                <div className='left-align mfont'>&emsp;Graduate Teaching Assistant for Code!</div>
                <div className='right-align mfont'>September 2021 - May 2022</div>
                </div>
                <div className='space'/>
                <div className='group'>
                <div className='left-align mfont'>Charles River Analytics, Cambridge MA</div>
                <div className='left-align mfont'>Software Engineer</div>
                <div className='right-align mfont'>June 2017 - August 2022</div>
                </div>
                <div className='space'/>
                <div className='group'>
                <div className='left-align mfont'>Massachusetts Institute of Technology, Cambridge MA</div>
                <div className='left-align mfont'>Web Developer (Lobbyview.org)</div>
                <div className='right-align mfont'>November 2016  - March 2017</div>
                </div>
            </div>
        </div>
    );
}


export default Resume;






