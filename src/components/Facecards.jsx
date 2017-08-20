import React, { Component } from 'react'
import { connect } from 'react-redux'

import Facecard from './Facecard'

class Facecards extends Component {

    render () {
        const facecardsList = Object.keys(this.props.search.status === "finished" ? (this.props.search.results) : (this.props.facecards.data || {}))
        .map((qid, index) => {
            const facecard = this.props.search.status === "finished" ? this.props.search.results[index] : this.props.facecards.data[qid]
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
        const facecardListOrLoading = hasReceivedData ? 
        ( facecardsList[viewingNthCard] || 
        <div style={{ position: 'relative', top: 250 }}>
            <p>검색결과가 존재하지 않거나 서버와의 연결이 불안정합니다.</p>
        </div>) : "로딩 중입니다 ...";
        return (
            // map 된 엘리멘트들은 div 로 감싸주지 않으면 invalid react element 에러가 난다.
            <div>
                { facecardListOrLoading }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    facecards: state.facecards,
    search: state.search
})

export default connect(mapStateToProps, null)(Facecards)