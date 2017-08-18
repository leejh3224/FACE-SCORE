import C from "../../constants";

const initialState = {
    hasReceivedData: false,
    submittingNew: false,
    errorMessage: "",
    data: {},
    status: {}
}

export default (state, action) => {
    let newState
    switch (action.type) {
        case C.USERSCORES_RECEIVE_DATA:
            return {
                ...state,
                hasReceivedData: true,
                data: action.data,
                errorMessage: ""
            };
        case C.USERSCORE_AWAIT_RATING_RESPONSE:
            return {
                ...state,
                submittingNew: true
            };
        case C.USERSCORE_RECEIVE_RATING_RESPONSE:
            return {
                ...state,
                submittingNew: false
            };
        case C.USERSCORE_EDIT_FINISH:
            newState = { ...state }
            delete newState.status[action.qid]
            return newState
        case C.USERSCORE_EDIT_SUBMIT:
            newState = { ...state }
            newState.status[action.qid] = C.USERSCORE_SUBMITTING
            return newState
        default:
            return state || initialState;
    }
}