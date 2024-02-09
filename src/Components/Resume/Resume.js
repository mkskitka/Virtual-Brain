import React, {useEffect} from 'react';
import $ from "jquery"
import './Resume.css';
import {useSelector} from "react-redux";
import { useMediaQuery } from 'react-responsive';



function Resume() {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const record_open = useSelector(state=> state.record_open);
    
    useEffect(function() {
        $(".Resume-Background").height($(".Resume-Content").height()+50);
        $(".Resume-Content").fadeOut(0);
        // if(isMobile) {
        //     $(".left-align").css("fontSize", ".85em")
        //     $(".right-align").css("fontSize", ".85em")
        // }
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
            // changeBrightness(.9);
        }, 0)
    }, []);


    return (
        <div className={"Resume-Wrapper"} >
            <div className={"Resume-Background"} />
            <div className={"Resume-Content"} style ={{display: "none"}}>
                <div className='flex-container'>
                <div className="resume-heading">Mary Kate Skitka</div>

                <div className='resume-heading mfont'>Education</div>

                <div className='left-align mfont'>New York University, Interactive Telecommunications Program</div>
                <div className='right-align mfont'>May '23</div>
                <div className='left-align mfont italic'>Master of Professional Studies</div>
                <div className='right-align mfont'></div>

                <div className='space'></div>

                <div className='left-align mfont'>Tufts University</div>
                <div className='right-align mfont'>May '18</div>
                <div className='left-align mfont italic'>Bachelor of Science in Cognitive Brain Science and Computer Science</div>
                <div className='right-align mfont'></div>
                <div className='space'></div>

                <div className='resume-heading mfont'>Experience</div>


                <div className='left-align mfont'>Creative Technologist Freelancer, Brooklyn NY</div>
                <div className='right-align mfont'>Sept '22 - Present</div>

                <div className='space'></div>

                <div className='left-align mfont'>New York University, Brooklyn NY</div>
                {isMobile ? <div className='left-align mfont italic'>Post Doctoral Research Fellow</div> :
                <div className='left-align mfont italic'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Post Doctoral Research Fellow</div>
                }
                <div className='right-align mfont'>Aug '23 - present</div>
                {isMobile ? <div className='left-align mfont italic'>Coding Lab Student Lead</div> :
                <div className='left-align mfont italic'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Coding Lab Student Lead</div>
                }
                <div className='right-align mfont'>Sept '22 - May '23</div>
                {isMobile ? <div className='left-align mfont italic'>Coding Lab Mentor</div> :
                <div className='left-align mfont italic'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Coding Lab Mentor</div>
                }
                <div className='right-align mfont'>Sept '21 - May '23</div>
                {isMobile ? <div className='left-align mfont italic'>Graduate Teaching Assistant for Creative Computation</div> :
                <div className='left-align mfont italic'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Graduate Teaching Assistant for Creative Computation</div>
                }
                <div className='right-align mfont'>Sept '21 - Jan '22</div>
                {isMobile ? <div className='left-align mfont italic'>Graduate Teaching Assistant for Code!</div> :
                <div className='left-align mfont italic'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Graduate Teaching Assistant for Code!</div>
                }
                <div className='right-align mfont'>Sept '21 - May '22</div>

                <div className='space'></div>

                <div className='left-align mfont'>Charles River Analytics, Cambridge MA</div>
                <div className='left-align mfont italic'>Software Engineer</div>
                <div className='right-align mfont'>Jun '17 - Aug '22</div>

                <div className='space'></div>
  
                <div className='left-align mfont'>Massachusetts Institute of Technology, Cambridge MA</div>
                <div className='left-align mfont italic'>Web Developer</div>
                <div className='right-align mfont'>Nov '16  - Mar '17</div>

                </div>
            </div>
        </div>
    );
}


export default Resume;






