import C from '../constants'

export const showToast = (label, message) => dispatch => {
    dispatch({ type: C.SHOW_TOAST, label, message})
    setTimeout(() => {
        dispatch({ type: C.HIDE_TOAST })
    }, 1000)
}