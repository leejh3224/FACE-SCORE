import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LoadingBar } from '../Common'
import Facecard from './Facecard'

class Facecards extends Component {

    render () {
        const facecardsList = Object.keys(this.props.search.status === "finished" ? (this.props.search.results) : (this.props.facecards.data || {}))
        .reverse()
        .map(qid => {
            const facecard = this.props.search.status === "finished" ? this.props.search.results[qid] : this.props.facecards.data[qid]
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
        const { hasReceivedData, viewingNthCard, randomPageNum } = this.props.facecards
        const facecardListOrLoading = hasReceivedData ? 
        ( facecardsList[randomPageNum >= 0 ? randomPageNum : viewingNthCard] || 
        <div style={{ position: 'relative', top: 250 }}>
            <p>검색결과가 존재하지 않거나 서버와의 연결이 불안정합니다.</p>
        </div>) : <div style={{ marginTop: 350 }}><LoadingBar /></div>;
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