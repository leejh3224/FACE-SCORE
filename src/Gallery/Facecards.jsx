import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LoadingBar } from '../Common'
import Facecard from './Facecard'
import NoResults from './NoResults'

import { setToInitial } from '../actions/search'

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
        <div style={{ position: 'relative', height: 400 }}>
            <NoResults 
                goBack={ () => { 
                    this.props.setToInitial()
                    this.props.clearSearchBar()
                } }
            />
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

const mapDispatchToProps = ({
    setToInitial
})

export default connect(mapStateToProps, mapDispatchToProps)(Facecards)