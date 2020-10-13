const ADD_DIRECTORY_WINDOW = "ADD_DIRECTORY_WINDOW";

const initialState = {
    active_windows:[],
    active_dir_windows:[],
    active_song:"islands.m4a",
    highest_z: 0
}

function brainReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
export default brainReducer();