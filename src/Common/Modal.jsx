import React, { Component } from 'react'
import { connect } from 'react-redux'

import { hideConfirm } from '../actions/confirm'
import { showToast } from '../actions/toast'

class Modal extends Component {
    render () {
        return (
            <div className="modal is-active">
                <div 
                    className="modal-background"
                    onClick={ () => { 
                        this.props.hideConfirm(Object.keys(this.props.facecards.status)) 
                        this.props.showToast("warning", "취소되었습니다.")
                    } }
                ></div>
                <div 
                    className="modal-content"
                    style={{
                        borderRadius: 5
                    }}
                >
                    { this.props.content }
                </div>
                <button 
                    className="modal-close is-large" 
                    aria-label="close"
                    onClick={ () => { 
                        this.props.hideConfirm(Object.keys(this.props.facecards.status)) 
                        this.props.showToast("warning", "취소되었습니다.")
                    } }
                >
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    facecards: state.facecards
})

const mapDispatchToProps = {
    hideConfirm,
    showToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)