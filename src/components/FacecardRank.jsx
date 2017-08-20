import React, { Component } from 'react'

import { 
    ico_trophy
} from '../images'

import RankItems from './RankItems'

class FacecardRank extends Component {
    render () {
        return (
            <div>
                <div className="column is-2 is-offset-5">
                    <img 
                        src={ ico_trophy } 
                        alt="trophy" 
                        width={200} 
                        height={200} 
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

export default FacecardRank