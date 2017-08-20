import React, { Component } from 'react'
import { connect } from "react-redux"

// components
import Facecards from './Facecards'

// actions
import { showToast } from '../actions/toast'
import { 
    turnToNextCardUnless,
    turnToPreviousCard
} from '../actions/facecards'
import { setToInitial } from '../actions/search'

// css
import '../Global.css'

class Gallery extends Component {

    componentWillMount () {
        if (this.props.location && this.props.location.pathname === "/Gallery") {
            this.props.setToInitial()
        }
    }

    render () {
        const lastPage = Object.keys(
            this.props.search.status === "finished" ?
            this.props.search.results : this.props.facecards.data
        ).length

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
                            this.props.turnToNextCardUnless(lastPage) 
                            if (this.props.facecards.viewingNthCard >=
                            lastPage - 1) {
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
    facecards: state.facecards,
    search: state.search
});

const mapDispatchToProps = {
    turnToNextCardUnless,
    turnToPreviousCard,
    showToast,
    setToInitial
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);