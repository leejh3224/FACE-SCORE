import React, { Component } from 'react'

// components
import RankItems from './RankItems'

// static
import { ico_trophy } from '../static'

import '../Global.css'

class Rank extends Component {
    render () {
        return (
            <div>
                <figure
                    style={{ 
                        display: "flex", 
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 150,
                        height: 130
                    }}>
                    <img
                        src={ ico_trophy } 
                        alt="trophy" 
                    />
                </figure>
                <div className="column is-8 is-offset-2">
                    <h1 className="title is-3 line-center-wrapper">
                        <span className="line-center"> 총 별점 </span>
                    </h1>
                    <RankItems />
                </div>
                <div className="column is-8 is-offset-2">
                    <h1 className="title is-3 line-center-wrapper">
                        <span className="line-center"> 평균 별점 </span>
                    </h1>
                    <RankItems />
                </div>
                <div className="column is-8 is-offset-2">
                    <h1 className="title is-3 line-center-wrapper">
                        <span className="line-center"> 카드 수 </span>
                    </h1>
                    <RankItems />
                </div>
            </div>
        )
    }
}

export default Rank