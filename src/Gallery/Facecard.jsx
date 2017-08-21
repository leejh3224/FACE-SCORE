import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider, { createSliderWithTooltip } from 'rc-slider'

// components
import { 
    Icon,
    LoadingBar 
} from '../Common'

// actions
import { turnToRandomPage } from '../actions/facecards'
import { showToast } from '../actions/toast'
import { submitScore } from '../actions/userscores'

// static
import { not_found } from '../static'

// css
import 'rc-slider/assets/index.css'
import '../Global.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class Facecard extends Component {

    constructor () {
        super()
        this.state = {
            value: 2,
        }
    }

    submitNewScore = e => {

        const { 
            userscores,
            facecards,
            auth,
            submitScore 
        } = this.props

        const haveRated = Object.values(userscores.data || {})
                                .filter(record => 
                                    record.qid === Object.keys(facecards.data)[facecards.viewingNthCard] &&
                                    record.username === auth.username
                                )
                                .length

        e.preventDefault();
        if (!userscores.submittingNew) {
            if (this.slider && this.state.value) {
               submitScore(this.state.value);

                if (!haveRated) {
                    this.props.showToast("success", "평가가 반영되었습니다.")   
                } else {
                    this.props.showToast("success", "평가가 수정되었습니다.")
                }
            } else if (this.slider && !this.state.value) {
                this.props.showToast("warning", "점수를 선택해주세요.")
            } else {
                this.props.showToast("warning", "본인의 카드입니다!")
            }
        }
    }
    
    render () {
        const {
            facecards,
            auth,
            userscores,
            search
        } = this.props

        const isYourCard = Object.values(search.status === "finished" ? search.results : facecards.data)
                                 .reverse()
                                 .filter((record, index, records) => {
                                        return records[facecards.viewingNthCard].username === auth.username
                                 })
                                  .length

        const allFacecards = Object.keys(search.status === "finished" ? search.results : facecards.data).reverse()

        const getScoreOfCard = qid =>
            Object.values(userscores.data || {})
                .filter(record => 

                    // to prevent undefined during loading
                    record.qid === qid
                )
                .reduce((first, next) => (first.score || first) + next.score
                , 0)

        const listWithScores = myCards =>
            myCards.map(qid => {
                const myCards = facecards.data[qid]
                return ({
                    qid,
                    url: myCards.url,
                    score: getScoreOfCard(qid)
                })
            })

        const starAndScore = listWithScores(allFacecards)
                            .map(card => 
                                <Icon 
                                    style={{ position: 'relative', left: '90%' }}
                                    label={ 'star' }
                                    score={ card.score }
                                />
                            )
        const pageNum = this.props.facecards.viewingNthCard
        return (
            <div>
            { !this.props.facecards.isLoadingCard ? 
                <div 
                    className="card" 
                    style={{ 
                        borderRadius: 5,
                        minWidth: 300,
                        maxWidth: 500, 
                    }} 
                >
                    {/* card-header  */}
                    <header 
                        className="card-header"
                        style={{
                            padding: '10px 0px 10px 20px'
                        }}
                    >
                        <div className="media" style={{ width: '100%' }}>
                            <div className="media-left is-narrow-mobile">
                                <div 
                                    className="is-avatar" 
                                    style={{ backgroundImage: `url(${this.props.url})` }} 
                                /> 
                            </div>
                            <div className="media-content">
                                <strong className="title is-size-6 has-text-dark">{ this.props.username }</strong>
                            </div>
                            <nav 
                                className="level" 
                                style={{ position: "relative", width: 50, paddingBottom: 3, top: 10, marginLeft: "auto" }}
                            >
                                <div className="level-item">
                                    <Icon 
                                        label={'random'} 
                                        onClick={ () => {
                                            let mode = this.props.search.status === "not searched" ? "gallery" : "search"
                                            this.props.turnToRandomPage(mode)
                                            if (Object.keys(this.props.search.results).length === 1) {
                                                this.props.showToast("warning", "검색결과가 1개입니다.")
                                            }
                                        } }
                                    />
                                </div>
                            </nav>
                        </div>
                    </header>
                    <div className="card-image">     
                        <figure className="image" style={{
                            width: '100%',
                            height: 'auto'
                        }}>
                            <img 
                                src={ this.props.url } 
                                alt={ 'face' }
                                ref={ cardImg => this.cardImg = cardImg }
                                onError={ () => this.cardImg.src = not_found }
                            />  
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <p className="is-2 has-text-grey">
                            { this.props.shortDescr && this.props.shortDescr.length ? this.props.shortDescr : '소개가 없습니다.' } 
                            </p> 
                            { !isYourCard ?
                            starAndScore[pageNum] : <p>{ this.props.auth.username + "님의 게시물입니다." }</p> }
                        </div>
                        { !isYourCard ?
                            <SliderWithTooltip
                                min={0}
                                max={5}
                                defaultValue={2}
                                step={1}
                                trackStyle={[{ backgroundColor: '#5f14ce', height: 2.5 }]}
                                handleStyle={[{ 
                                    backgroundColor: '#5f14ce',
                                    borderColor: 'white',
                                    height: 30,
                                    width: 30,
                                    marginLeft: -15,
                                    marginTop: -13
                                }]}
                                ref={ slider => this.slider = slider }
                                onChange={ value => this.setState(prev => ({
                                    ...prev,
                                    value
                                })) }
                            />
                        : null }
                    </div>
                    <footer className="card-footer">
                        <a 
                            className="card-footer-item"
                            style={{
                                background: '#6d2cf9',
                                color: 'white',
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5
                            }}
                            onClick={ this.submitNewScore }
                        >
                            점수주기
                        </a>
                    </footer>
                </div> : <div style={{ marginTop: 350 }}><LoadingBar /></div> }
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    facecards: state.facecards,
    userscores: state.userscores,
    auth: state.auth,
    search: state.search
});

const mapDispatchToProps = {
    turnToRandomPage,
    submitScore,
    showToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Facecard);
