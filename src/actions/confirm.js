import C from '../constants'

export const showDeleteConfirm = (message, qid) => dispatch => {
    dispatch({ type: C.SHOW_CONFIRM,  qid, message })
}

export const showEditModal = qid => dispatch => {
    dispatch({ type: C.SHOW_CONFIRM, qid })
}

export const hideConfirm = qid => dispatch => {
    dispatch({ type: C.HIDE_CONFIRM })
    dispatch({ type: C.FACECARD_EDIT_FINISH, qid })
}