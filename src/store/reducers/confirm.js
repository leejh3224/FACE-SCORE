import C from '../../constants'

const initialState = {
    isVisible: false,
    message: "",
    data: {
        qid: ""
    }
}

export default (state, action) => {
    switch (action.type) {
        case C.SHOW_CONFIRM:
            return {
                ...state,
                isVisible: true,
                message: action.message,
                data: {
                    ...state.data,
                    qid: action.qid
                }
            }
        case C.HIDE_CONFIRM: 
            return {
                ...initialState
            }
        default:
            return state || initialState
    }
}