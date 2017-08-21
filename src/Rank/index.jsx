import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import RankItems from './RankItems'

// static
import { ico_trophy } from '../static'

import '../Global.css'

class Rank extends Component {
    render () {
        const allUsers = Object.values(this.props.userscores.data || {})
                                .map(record => record.username)
        const usernamesList = [...new Set(allUsers)]
        const cardsOf = username => Object.keys(this.props.facecards.data)
                                            .filter(qid => {
                                                const card = this.props.facecards.data[qid]
                                                return card.username === username ? qid : null
                                            })
                                            .map(qid => qid)
        const totalScoreOf = username => Object.values(this.props.userscores.data || {})
                                            .filter(record => cardsOf(username).includes(record.qid))
                                            .reduce((f,n) => (f.score || f) + n.score)
        const scoresList = usernamesList.map(name => totalScoreOf(name))
        const numOfCardsBy = username => Object.values(this.props.facecards.data || {})
                                                .filter(record => record.username === username)
        const numberOfCardsList = usernamesList.map(name => numOfCardsBy(name).length)
        const avgList = scoresList.map((score, index) => (score / numberOfCardsList[index]).toFixed(2))
        let totalScoreAndAvg = []
        
        for(let i = 0; i < usernamesList.length; i++) {
            totalScoreAndAvg.push(
                {
                    username: usernamesList[i],
                    totalScore: scoresList[i],
                    avg: avgList[i],
                    numberOfCards: numberOfCardsList[i]
                }
            )
        }

        console.log(totalScoreAndAvg)

        return (
            <div>
                <figure
                    style={{ 
                        display: "flex", 
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 150,
                        height: 130
                    }}>
                    <img
                        src={ ico_trophy } 
                        alt="trophy" 
                    />
                </figure>
                <div className="column is-8 is-offset-2">
                    <h1 className="title is-3 line-center-wrapper">
                        <span className="line-center"> 총 별점 </span>
                    </h1>
                    <RankItems
                        by={ "totalScore" }
                        users={ usernamesList } 
                        data={ totalScoreAndAvg } 
                    />
                </div>
                <div className="column is-8 is-offset-2">
                    <h1 className="title is-3 line-center-wrapper">
                        <span className="line-center"> 평균 별점 </span>
                    </h1>
                    <RankItems
                        by={ "avg" }
                        users={ usernamesList } 
                        data={ totalScoreAndAvg } 
                    />
                </div>
                <div className="column is-8 is-offset-2">
                    <h1 className="title is-3 line-center-wrapper">
                        <span className="line-center"> 카드 수 </span>
                    </h1>
                    <RankItems
                        by={ "numberOfCards" }
                        users={ usernamesList } 
                        data={ totalScoreAndAvg } 
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    userscores: state.userscores,
    facecards: state.facecards
})

export default connect(mapStateToProps, null)(Rank)