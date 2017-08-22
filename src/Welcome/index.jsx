import React, { Component } from 'react'
import { connect } from 'react-redux'

// component
import Auth from './Auth'

// actions
import { listenToAuth } from "../actions/auth"
import { listenToFacecards } from '../actions/facecards'
import { listenToUserscores } from '../actions/userscores'

// static
import { 
    img_person
} from '../static'

class WelcomeModal extends Component {
    componentWillUnmount () {
        this.props.listenToAuth()
        this.props.listenToFacecards()
        this.props.listenToUserscores()
    }
    render () {
        if (this.props.auth.status === 'AUTH_LOGGED_IN') {
            this.props.history.push('/Home')
        }

        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                    <div 
                        className="modal-content"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <div 
                            style={{
                                minWidth: 250,
                                maxWidth: 350,
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                flexDirection: 'column',
                                borderRadius: 10
                            }}
                        >
                            <figure className="image">
                                <img 
                                    src={ img_person } 
                                    alt="person" 
                                    style={{
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        marginBottom: "2%",
                                        height: 200
                                    }}
                                />
                            </figure>
                            <div 
                                className="content" 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <h1 
                                    className="title is-4 has-text-centered"
                                    style={{
                                        fontWeight: "bolder"
                                    }}
                                >
                                    피퍼즈를 경험해보세요.
                                </h1>
                                <h2 
                                    className="subtitle is-6 has-text-centered"
                                    style={{
                                        marginBottom: "2%"
                                    }}
                                >
                                    너의 사진, 모두의 사진, 피퍼즈
                                </h2>
                            </div>
                            <Auth />
                            <div style={{ marginTop: "1%", marginBottom: "3%" }}>
                                <p 
                                    className="subtitle has-text-centered"
                                    style={{
                                        fontSize: 7
                                    }}
                                >
                                    계속 진행하면 Pypuz 서비스 약관, 개인정보
                                </p>
                                <p 
                                    className="subtitle has-text-centered"
                                    style={{
                                        fontSize: 7,
                                        marginTop: "-2%"
                                    }}
                                >
                                    보호정책에 동의하는 것으로 간주됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = ({
    listenToFacecards,
    listenToUserscores,
    listenToAuth
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeModal)