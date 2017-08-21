import React, { Component } from 'react'
import { connect } from 'react-redux'

import { showToast } from '../actions/toast'
import { 
    deleteFacecard,
    turnToPreviousCard
} from '../actions/facecards'
import { hideConfirm } from '../actions/confirm'
import { deleteScore } from '../actions/userscores'

import '../Global.css'

class Confirm extends Component {
    render () {
        return (
            <div>
                <div className="box confirm-body">
                    <p className="has-text-centered">{ this.props.confirm.message }</p>
                    <div className="column">
                        <a 
                            className="button is-danger is-outlined"
                            onClick={ () => {
                                this.props.deleteFacecard(this.props.confirm.data.qid)
                                this.props.deleteScore(this.props.confirm.data.qid)
                                this.props.turnToPreviousCard()
                                this.props.hideConfirm()
                                this.props.showToast("danger", "삭제되었습니다!")
                            }}
                            style={{
                                width: 90
                            }}
                        >
                            예
                        </a>
                        <a 
                            className="button"
                            onClick={ () => {
                                this.props.hideConfirm()
                                this.props.showToast("warning", "취소되었습니다!")
                            }}
                            style={{
                                width: 90
                            }}
                        >
                            아니요
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    confirm: state.confirm
})

const mapDispatchToProps = {
    hideConfirm,
    deleteFacecard,
    showToast,
    deleteScore,
    turnToPreviousCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)