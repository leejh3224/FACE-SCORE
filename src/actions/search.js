import C from '../constants'
import { database } from "../firebaseApp"

const facecardsRef = database.ref("facecards")

export const searchStart = keywords => dispatch => {
    dispatch({ type: C.SEARCH_START, keywords })
    facecardsRef.on("value", snapshot => {
        const values = Object.values(snapshot.val())
                            // to ignore case
                            .filter((data, index) =>     
                                data.username.toUpperCase().includes(keywords.toUpperCase())
                                || data.shortDescr.toUpperCase().includes(keywords.toUpperCase())
                            )
        const qids = Object.keys(snapshot.val())
                            .filter(qid => 
                                snapshot.val()[qid].username.toUpperCase().includes(keywords.toUpperCase())
                                || snapshot.val()[qid].shortDescr.toUpperCase().includes(keywords.toUpperCase())
                            )
        
        const data = (values, qids) => {
            let o = {}
            for (let i = 0; i < values.length; i++) {
                o[qids[i]] = values[i]
            }
            return o
        }
        dispatch({ type: C.SEARCH_SAVE_RESULTS, data: data(values, qids) })
    })

    //  result page should show first page of result always
    dispatch({ type: C.FACECARD_SET_PAGENUMBER_TO_DEFAULT })
    setTimeout(() => {
        return (
            dispatch({ type: C.SEARCH_END })
        )
    }, 1200)
}

export const setToInitial = () => dispatch => {
    dispatch({ type: C.FACECARD_SET_PAGENUMBER_TO_DEFAULT })
    dispatch({ type: C.SEARCH_SET_TO_INITIAL })
}