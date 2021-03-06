import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM } from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function (state = initialState, action) {
    let index;
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM: 
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = state.screams.findIndex((scream) => scream._id === action.payload._id);
            state.screams[index] = action.payload;
            if (state.scream._id === action.payload._id) {
                state.scream = action.payload;
            }
            return {
                ...state
            };
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream._id === action.payload);
            state.screams.splice(index, 1);
            return { ...state }

        case POST_SCREAM:
            return {
                ...state,
                screams: [action.payload, ...state.screams]
            }
        default:
            return state;
    }
}