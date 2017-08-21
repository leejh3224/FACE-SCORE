import C from "../constants";
import { database } from "../firebaseApp";

const userscoresRef = database.ref("userscores")

export const listenToUserscores = () => dispatch => 
  userscoresRef.on(
    "value",
    snapshot => 
      dispatch({
        type: C.USERSCORES_RECEIVE_DATA,
        data: snapshot.val()
      })
  )

export const submitScore = newScore => (dispatch, getState) => {
    const state = getState()

    let current
    let currentQid

    if (state.search.status === "not searched") {

      // gallery shows card in new-to-old order
      current = Object.keys(state.facecards.data).length - (1 + state.facecards.viewingNthCard)
      currentQid = Object.keys(state.facecards.data)[current]
     
    } else { 
      
      // if user is submitting score from search view
      current = Object.keys(state.search.results).length - (1 + state.facecards.viewingNthCard)
      currentQid = Object.keys(state.search.results)[current]   
    }

    const userscore = {
          username: state.auth.username,
          uid: state.auth.uid,
          ratedAt: new Date().toLocaleString(),
          score: newScore,
          qid: currentQid
    }

    dispatch({ type: C.USERSCORE_AWAIT_RATING_RESPONSE })

    // check the card is rated or not by the user
    // first, order by qid
    userscoresRef.orderByChild("qid")
                 .equalTo(currentQid)
                 .once("value", 
                  snapshot => {
                  
                    // then if record exists, check whether it's the user's
                    const haveRated = Object.values(snapshot.val() || {})
                                            .filter(record => record.username === state.auth.username)
                                            .length >= 1

                    if (!haveRated) {
                      userscoresRef.push(userscore)
                    } else {
                      const oldRecord = userscoresRef.child(`${Object.keys(snapshot.val())[0]}`)
                      oldRecord.update({
                        score: newScore
                      })
                    }
                  }
                    
                  )
    dispatch({ type: C.USERSCORE_RECEIVE_RATING_RESPONSE });
}

export const deleteScore = qid => dispatch => {
  dispatch({ type: C.USERSCORE_EDIT_SUBMIT, qid })
  userscoresRef.orderByChild("qid")
                .equalTo(qid)
                .once("value", 
                  snapshot => 
                    snapshot.val() ? 
                      snapshot.forEach(
                        data => data.ref.remove(() => dispatch({ type: C.USERSCORE_EDIT_FINISH, qid }))
                      ) : null
                )
}