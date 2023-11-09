import * as _ from "lodash";
import { ADD_DIRECTORY_WINDOW, REMOVE_DIRECTORY_WINDOW, OPEN_CLOSE_TERMINAL, CHANGE_ACTIVE_PROJECT,
    CHANGE_ACTIVE_SONG, OPEN_CLOSE_RECORD, ROUTE_TO_PROJECT } from "./actions"

const initialState = {
    active_windows:[],
    terminal_open: false,
    record_open: false,
    active_project: null,
    active_song:"sound/heart.m4a",
    route_to_project: null,
}

function brainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DIRECTORY_WINDOW:
            if(!state.active_windows.includes(action.id)) {
                let new_active_windows = Object.assign([], state.active_windows);
                new_active_windows.push(action.id)
                return Object.assign({}, state, {
                    active_windows: new_active_windows,
                })
            }
            return Object.assign({}, state)
        case REMOVE_DIRECTORY_WINDOW:
            //let new_active_windows = Object.assign([], state.active_windows);
            let active_windows = state.active_windows.filter(w => w !== action.id)
             return Object.assign({}, state, {
                 active_windows: active_windows,
              })
        case OPEN_CLOSE_TERMINAL:
            return Object.assign({}, state, {
                terminal_open: !state.terminal_open,
            })
        case OPEN_CLOSE_RECORD:
            let open = !state.record_open
            return Object.assign({}, state, {
                record_open: open,
            })
        case CHANGE_ACTIVE_SONG:
            return Object.assign({}, state, {
                active_song: action.song,
            })
        case CHANGE_ACTIVE_PROJECT:
            return Object.assign({}, state, {
                active_project: action.project,
            })
        case ROUTE_TO_PROJECT:
            return Object.assign({}, state, {
                route_to_project: action.project,
            })
        default:
            return state
    }
}
export default brainReducer;