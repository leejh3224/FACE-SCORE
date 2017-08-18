import C from '../../constants'

const initialState = {
    isVisible: false,
    label: "",
    message: ""
}

export default (state, action) => {
    switch (action.type) {
        case (C.SHOW_TOAST):
            return {
                ...state,
                isVisible: true,
                label: action.label,
                message: action.message
            }
        case (C.HIDE_TOAST):
            return initialState
        default:
            return state || initialState
    }
}