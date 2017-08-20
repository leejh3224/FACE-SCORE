import C from '../../constants'

const initialState = {
    status: "not searched",
    keywords: "",
    results: null
}

export default (state, action) => {
    switch (action.type) {
        case C.SEARCH_START: 
            return {
                ...state,
                status: "searching",
                keywords: action.keywords
            }
        case C.SEARCH_END:
            return {
                ...state,
                status: "finished"
            }
        case C.SEARCH_SAVE_RESULTS:
            return {
                ...state,
                results: action.data
            }
        case C.SEARCH_SET_TO_INITIAL:
            return initialState
        default: 
            return state || initialState
    }
}