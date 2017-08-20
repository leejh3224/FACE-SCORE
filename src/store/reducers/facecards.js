import C from "../../constants";

const initialState = {
  hasReceivedData: false,
  submittingNew: false,
  errorMessage: "",
  data: {},
  status: {},
  viewingNthCard: 0
};

export default (state, action) => {
  let newState
  switch (action.type) {
    case C.FACECARDS_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,
        errorMessage: ""
      };
    case C.FACECARD_AWAIT_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: true
      };
    case C.FACECARD_RECEIVE_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: false
      };
    case C.FACECARD_TURN_NEXT:
      if (state.viewingNthCard < action.end - 1) {
        return {
          ...state,
          viewingNthCard: state.viewingNthCard += 1
        }
      } else {
        return state
      }
    case C.FACECARD_TURN_PREVIOUS:
      if (state.viewingNthCard === 0) {
        return state
      } else {
        return {
          ...state,
          viewingNthCard: state.viewingNthCard -= 1
        }
      }
    case C.FACECARD_SET_PAGENUMBER_TO_DEFAULT: 
      return {
        ...state,
        viewingNthCard: 0
      }
    case C.FACECARD_EDIT:
      newState = { ...state };
      newState.status[action.qid] = C.FACECARD_EDITING;
      return newState;
    case C.FACECARD_EDIT_FINISH:
      newState = { ...state }
      delete newState.status[action.qid]
      return newState
    case C.FACECARD_EDIT_SUBMIT:
      newState = { ...state }
      newState.status[action.qid] = C.FACECARD_SUBMITTING
      return newState
    default:
      return state || initialState
  }
};
