import React, { Component } from 'react'

import { icons } from '../constants/icons'
import '../Global.css'

import Auth from './Auth'

class FacecardMain extends Component {

    componentDidMount () {

        const mainBackground = icons[13]

        mainBackground.getDownloadURL().then(
            url => {
                if (this.bg) {
                    this.bg.style.backgroundImage = `url(${ url })`
                }
            } 
        )
    }

    render () {
        return (
            <section 
                className="hero is-large"
            >
                { /* Body */ }
                <div 
                    className="hero-body mobile-longHero"
                    ref={bg => this.bg = bg}
                    style={{ 
                        backgroundImage: null,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}
                >
                    <div 
                        className="container has-text-centered has-text-white mobile-marginTop"
                    >
                        <h1 
                            className="title has-text-white"
                            style={{
                                fontWeight: 'bolder',
                                fontSize: '2em'
                            }}
                        >
                            니 얼굴 좀 그래 ..
                        </h1>
                        <h2 
                            className="subtitle has-text-white"
                        >
                            울지 말고 평가나 받자
                        </h2>
                        <Auth />
                    </div>
                </div>

                { /* Footer */ }
                <div className="hero-foot">
                    <nav className="tabs">
                    <div className="container">
                        <p>{ "ⓒ FaceScore 2017. Gompro & Patrick all rights reserved." }</p>
                    </div>
                    </nav>
                </div>
            </section>
        )
    }
}

export default FacecardMain