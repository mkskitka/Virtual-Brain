import {useEffect} from 'react';
import $ from "jquery"
import {projects} from "../../Config/projects";
import "./ActiveProject.css"
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_DIRECTORY_WINDOW,
    REMOVE_DIRECTORY_WINDOW
} from "../../Redux/actions";

function ActiveProject(props) {

    const active_project = useSelector(state => state.active_project)
    const dispatch = useDispatch()

    // All this logic should go elsewhere ...
    // removing and adding closable project windows  
    useEffect(() => {
        setTimeout(() => {
            if(active_project) {
                    dispatch({type: ADD_DIRECTORY_WINDOW, id: active_project})

            }
            else {
                for(let i=0; i<projects.length; i++) {
                    dispatch({type: REMOVE_DIRECTORY_WINDOW, id: projects[i].id})
                }
            }
            console.log("active project changed ", active_project)
       
        }, 500);
    }, [active_project]);

    return (
        ""
    );
}

export default ActiveProject;