import React, { Component } from 'react'
import { connect } from 'react-redux'

import Icon from './Icon'
import DropDown from './DropDown'

import { 
    showDeleteConfirm,
    showEditModal
} from '../actions/confirm'
import { logoutUser } from '../actions/auth'
import { startFacecardEdit } from '../actions/facecards'

import '../Global.css'

class FacecardProfile extends Component {

    constructor() {
        super()
        this.state = {
            usermenuExpanded: false,
            recentCardsExpanded: false,
            popularCardsExpanded: false
        }
    }
 
    render () {
        const myFacecards = Object.keys(this.props.facecards.data || {})
        .filter(qid => {
            const card = this.props.facecards.data[qid]
            return card.username === this.props.auth.username
        })

        const getScoreOfCard = qid => 
            Object.values(this.props.userscores.data || {})
                .filter(record => 
                    // to prevent undefined during loading
                    record.qid === qid
                )
                .reduce((first, next) => (first.score || first) + next.score
                ,0)

        // sorting
        const orderByScore = (a,b) => {
            const scoreA = a.score
            const scoreB = b.score

            let comparison = 0

            if (scoreA > scoreB) {
                comparison = -1;
            } else if (scoreA < scoreB) {
                comparison = 1;
            }

            return comparison
        }
        
        // with array I can return objects like this
        const listOrderedByScore = myCards => {

            const result = myCards.map(qid => {
                const myCards = this.props.facecards.data[qid]
                return ({
                    qid,
                    url: myCards.url,
                    score: getScoreOfCard(qid)
                })
            })

            return result.sort(orderByScore)
        }

        const listOrderedByCreatedDate = myCards => 
            myCards.map(qid => {
                const myCards = this.props.facecards.data[qid]
                return ({
                    qid,
                    url: myCards.url,
                    score: getScoreOfCard(qid)
                })
            }).reverse()

        const recentCards = listOrderedByCreatedDate(myFacecards)
        .map((card, index) =>
            <div 
                className="is-small-card mobile-card-full-width"
                key={index}
            >  
                <div 
                    style={{
                        width: '100%',
                        height: 180,
                        backgroundImage: `url(${ card.url })`,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 50%'
                    }}
                />
                <div
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '100%',
                        height: 50,
                        top: 0
                    }}
                >
                    <Icon                        
                        style={{ bottom: 10, left: 22 }}
                        label={'star'}
                        score={card.score}
                    />
                    <Icon 
                        style={{ bottom: 10, right: 3 }}
                        label={'trash'}
                        onClick={ () => this.props.showDeleteConfirm("정말 삭제하시겠습니까?", card.qid) }
                    />
                    <Icon                        
                        style={{ bottom: 10, right: 40 }}
                        label={'pencil'}
                        onClick={ () => { 
                            this.props.startFacecardEdit(card.qid) 
                            this.props.showEditModal(card.qid)
                        }}
                    />
                </div>
            </div>
        )
        
        const popularCards = listOrderedByScore(myFacecards)
        .map((card, index) =>
            <div 
                className="is-small-card mobile-card-full-width"
                key={index}
            >   
                <div 
                    style={{
                        width: '100%',
                        height: 180,
                        backgroundImage: `url(${ card.url })`,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 50%'
                    }}
                />
                <div
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '100%',
                        height: 50,
                        top: 0
                    }}
                >
                    <Icon                        
                        style={{ bottom: 10, left: 22 }}
                        label={'star'}
                        score={card.score}
                    />
                    <Icon 
                        style={{ bottom: 10, right: 3 }}
                        label={'trash'}
                        onClick={ () => this.props.showDeleteConfirm("정말 삭제하시겠습니까?", card.qid) }
                    />
                    <Icon                        
                        style={{ bottom: 10, right: 40 }}
                        label={'pencil'}
                        onClick={ () => { 
                            this.props.startFacecardEdit(card.qid) 
                            this.props.showEditModal(card.qid)
                        }}
                    />
                </div>
            </div>
        ) 

        return (
            <div>
                <div className="column is-8 is-offset-2">
                    <div className="box" style={{ position: 'relative' }}>
                        <h1>{ this.props.auth.username ? 
                                this.props.auth.username + " 님의 카드" : "먼저 로그인해주세요." }</h1>
                        <Icon
                            style={{ bottom: 13, right: 0 }}
                            label={'ellipsis-v'} 
                            onClick={ () => this.setState(prev => ({
                                ...prev,
                                usermenuExpanded: !prev.usermenuExpanded
                            })) }
                        />
                        { this.props.auth.username && this.state.usermenuExpanded ? 
                            <DropDown 
                                style={{ right: 200 }} 
                                logout={ this.props.logoutUser } 
                                history={ this.props.history }
                            /> : null }
                    </div>
                    <hr />
                    <div className="box">
                        {/* box header */}
                        <div className="columns is-clearfix is-mobile">
                            <div className="column">
                                <h1>최근 카드</h1>
                            </div>
                            <div className="column">
                                <a 
                                    className="button is-danger is-outlined is-pulled-right"
                                    onClick={ () => this.setState(prev => ({
                                        ...prev,
                                        recentCardsExpanded: !prev.recentCardsExpanded
                                    })) }
                                >
                                    { this.state.recentCardsExpanded ? '접기' : '더보기' }
                                </a>
                            </div>
                        </div>
                        { !recentCards.length ? "표시할 카드가 없습니다." :
                            this.state.recentCardsExpanded ? 
                                recentCards : recentCards.slice(0, 4) }
                    </div>
                    <div className="box">
                        {/* box header */}
                        <div className="columns is-mobile">
                            <div className="column">
                                <h1>인기 카드</h1>
                            </div>
                            <div className="column">
                                <a 
                                    className="button is-danger is-outlined is-pulled-right"
                                    onClick={ () => this.setState(prev => ({
                                        ...prev,
                                        popularCardsExpanded: !prev.popularCardsExpanded
                                    })) }
                                >
                                    { this.state.popularCardsExpanded ? '접기' : '더보기' }
                                </a>
                            </div>
                        </div>
                        { !popularCards.length ? "표시할 카드가 없습니다." :
                            this.state.popularCardsExpanded ? 
                                popularCards : popularCards.slice(0,4) }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    facecards: state.facecards,
    userscores: state.userscores
});

const mapDispatchToProps = { 
    showDeleteConfirm,
    showEditModal,
    startFacecardEdit,
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(FacecardProfile)