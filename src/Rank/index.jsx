import React, { Component } from 'react'

// components
import RankItems from './RankItems'

// static
import { ico_trophy } from '../static'

class Rank extends Component {
    render () {
        return (
            <div>
                <div
                    style={{ 
                        display: "flex", 
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 220,
                        height: 200
                    }}>
                    <img
                        className="column"
                        src={ ico_trophy } 
                        alt="trophy" 
                    />
                </div>
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