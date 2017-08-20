import React, { Component } from 'react'

import FacecardGallery from './FacecardGallery'

import { lunatic_sky } from '../images'

import '../Global.css'

class FacecardMain extends Component {

    render () {
        return (
            <div>
                <nav className="level">
                    <div className="level-item">
                        <p className="subtitle is-5">
                            총 <strong>23</strong> 개의 카드
                        </p>
                        <div className="field has-addons" style={{ marginLeft: 10 }}>
                            <p className="control">
                                <input className="input" type="text" placeholder="유저이름 OR 내용" />
                            </p>
                            <p className="control">
                                <button className="button">
                                    검색
                                </button>
                            </p>
                        </div>
                    </div>
                </nav>
                <div
                    className="column is-8 is-offset-2"
                    style={{ 
                        backgroundImage: `url(${ lunatic_sky })`,
                        height: 500,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderRadius: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <h1 className="title is-5 has-text-centered has-text-white">
                        * 
                    </h1>
                </div>
            </div>
        )
    }
}

export default FacecardMain