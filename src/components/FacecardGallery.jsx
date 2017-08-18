import React, { Component } from 'react'
import { connect } from "react-redux";

import { showToast } from '../actions/toast'
import { 
    turnToNextCard,
    turnToPreviousCard
} from '../actions/facecards'

import '../Global.css'

import Facecards from './Facecards'

class FacecardGallery extends Component {
    render () {
        return (
            this.props.auth.uid ?
            <div className="columns is-mobile">
                {/* left nav */}
                <div className={"column is-2 is-one-quarter-mobile"}>
                    <a 
                        className="centered arrow-icon"
                        style={{ color: '#6d2cf9' }}
                        onClick={ () => { 
                            this.props.turnToPreviousCard() 
                            if (!this.props.facecards.viewingNthCard) {
                                this.props.showToast('warning', '첫번째 페이지입니다.')
                            }
                        }}
                    >
                        <span className="icon is-large">
                            <i className="fa fa-chevron-left" />
                        </span> 
                    </a>
                </div>

                <div 
                    className="column is-8 is-half-mobile mobile-marginTop"
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Facecards />
                </div>  

                {/* right nav */}
                <div className={"column is-2 is-one-quarter-mobile"}>
                    <a 
                        className="centered arrow-icon"
                        style={{ color: '#6d2cf9' }}
                        onClick={ () => {
                            this.props.turnToNextCard() 
                            if (this.props.facecards.viewingNthCard >=
                            Object.keys(this.props.facecards.data).length - 1) {
                                this.props.showToast('warning', '마지막 페이지입니다.') 
                            }
                        }}
                    >
                        <span className="icon is-large">
                            <i className="fa fa-chevron-right" />
                        </span>
                    </a>
                </div>
            </div> :
            <p>로그인된 상태에서만 얼굴평가를 하실 수 있습니다.</p>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    facecards: state.facecards
});

const mapDispatchToProps = {
    turnToNextCard,
    turnToPreviousCard,
    showToast
}

export default connect(mapStateToProps, mapDispatchToProps)(FacecardGallery);