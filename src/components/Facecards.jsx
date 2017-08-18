import React, { Component } from 'react'
import { connect } from 'react-redux'

import Facecard from './Facecard'

class Facecards extends Component {

    render () {
        const facecardsList = Object.keys(this.props.facecards.data).map(qid => {
            const facecard = this.props.facecards.data[qid]
            return (
                <Facecard 
                    key={qid}
                    qid={qid}
                    url={facecard.url}
                    username={facecard.username}
                    shortDescr={facecard.shortDescr}
                    ref={ c => this.c = c }
                />
            ) 
        })
        const { hasReceivedData, viewingNthCard } = this.props.facecards
        const facecardListOrLoading = hasReceivedData
        ? facecardsList[viewingNthCard] : "로딩 중입니다 ...";
        return (
            // map 된 엘리멘트들은 div 로 감싸주지 않으면 invalid react element 에러가 난다.
            <div>
                { facecardListOrLoading }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    facecards: state.facecards
})

export default connect(mapStateToProps, null)(Facecards)