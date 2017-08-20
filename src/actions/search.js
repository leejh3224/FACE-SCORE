import C from '../constants'
import { database } from "../firebaseApp"

const facecardsRef = database.ref("facecards")

export const searchStart = keywords => dispatch => {
    dispatch({ type: C.SEARCH_START, keywords })
    facecardsRef.on("value", snapshot => {
        const data = Object.values(snapshot.val())
                            // to ignore case
                            .filter(data => 
                                data.username.toUpperCase().includes(keywords.toUpperCase())
                                || data.shortDescr.toUpperCase().includes(keywords.toUpperCase())
                            )

        dispatch({ type: C.SEARCH_SAVE_RESULTS, data })
    })
    setTimeout(() => {
        return (
            dispatch({ type: C.SEARCH_END })
        )
    }, 1200)
}

export const setToInitial = () => dispatch => 
    dispatch({ type: C.SEARCH_SET_TO_INITIAL })