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
    img_person,
    txt_facescore
} from '../static'

class WelcomeModal extends Component {
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
                            alignContent: 'center'
                        }}
                    >
                        <div 
                            style={{
                                minWidth: 350,
                                maxWidth: 450,
                                height: 'auto',
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
                                        borderTopRightRadius: 10
                                    }}
                                />
                            </figure>
                            <figure 
                                className="image"
                                style={{ 
                                    width: 150, 
                                    height: 50,
                                    margin: '5% 0% 5% 33%' 
                                }}
                            >
                                <img 
                                    src={ txt_facescore } 
                                    alt="logo" 
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
                                    니 얼굴 좀 그래 ..
                                </h1>
                                <h2 
                                    className="subtitle is-6 has-text-centered"
                                    style={{
                                        marginBottom: 30
                                    }}
                                >
                                    울지 말고 평가나 받자
                                </h2>
                            </div>
                            <Auth />
                            <div style={{ marginTop: 10, marginBottom: 50 }}>
                                <p 
                                    className="subtitle has-text-centered"
                                    style={{
                                        fontSize: 7
                                    }}
                                >
                                    계속 진행하면 FaceScore 서비스 약관, 개인정보
                                </p>
                                <p 
                                    className="subtitle has-text-centered"
                                    style={{
                                        fontSize: 7,
                                        marginTop: -15
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