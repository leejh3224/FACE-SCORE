import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../Global.css'

// labels : [success, warning, danger]
class Toast extends Component {
    render () {
        return (
            <div className="toast-body toast-slide-out">
                <span className={`icon icon-${this.props.toast.label}`}>       
                    { this.props.toast.label === 'success' ? 
                        <i className="fa fa-check" /> : <i className="fa fa-exclamation" />
                    }
                </span>
                { this.props.toast.message }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    toast: state.toast
})

export default connect(mapStateToProps, null)(Toast)