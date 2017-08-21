import C from "../constants"
import { database } from "../firebaseApp"

import { showToast } from './toast'

const facecardsRef = database.ref("facecards")

export const listenToFacecards = () => dispatch =>
  facecardsRef.on(
    "value",
    snapshot =>
      dispatch({
        type: C.FACECARDS_RECEIVE_DATA,
        data: snapshot.val()
      })
  )

export const submitFacecard = data => (dispatch, getState) => {
  const state = getState();
  const facecard = {
    url: data.url,
    shortDescr: data.shortDescr,
    username: state.auth.username,
    uid: state.auth.uid,
    createdAt: new Date().toLocaleString(),
  }
  dispatch({ type: C.FACECARD_AWAIT_CREATION_RESPONSE })
  facecardsRef.push(facecard, error => error ? showToast("warning", "에러가 발생했습니다.") : null)
  dispatch({ type: C.FACECARD_RECEIVE_CREATION_RESPONSE })
}

export const turnToNextCardUnless = end => dispatch => {
  dispatch({ type: C.FACECARD_TURN_NEXT, end })
}

export const turnToPreviousCard = () => dispatch => {
  dispatch({ type: C.FACECARD_TURN_PREVIOUS })
}

export const turnToRandomPage = mode => (dispatch, getState) => {
  const state = getState()
  const getRandomNum = mode => 
    (max = Object.keys(
      mode === 'search' ? 
      state.search.results : state.facecards.data
    ).length) => Math.floor(Math.random() * max)
  const randomPageNum = getRandomNum(mode)()
  
  dispatch({ type: C.FACECARD_SHOW_RANDOM_CARD, randomPageNum })
}

export const startFacecardEdit = qid => dispatch =>
  dispatch({ type: C.FACECARD_EDIT, qid })

export const cancelFacecardEdit = qid => dispatch =>
  dispatch({ type: C.FACECARD_EDIT_FINISH, qid })

export const submitFacecardEdit = (qid, data) => (dispatch, getState) => {
  const state = getState()
  const facecard = {
    url: data.url,
    shortDescr: data.shortDescr,
    username: state.auth.username,
    uid: state.auth.uid,
    editedAt: new Date().toLocaleString()
  }
  dispatch({ type: C.FACECARD_EDIT_SUBMIT, qid })
  facecardsRef.child(qid).set(facecard, error => {
    dispatch({ type: C.HIDE_CONFIRM })
    dispatch({ type: C.FACECARD_EDIT_FINISH, qid })
  })
}


export const deleteFacecard = qid => dispatch => {
  dispatch({ type: C.FACECARD_EDIT_SUBMIT, qid })
  facecardsRef.child(qid).remove(() => {
    dispatch({ type: C.FACECARD_EDIT_FINISH, qid })
  }, error => error ? showToast("warning", "에러가 발생했습니다.") : null)
}


