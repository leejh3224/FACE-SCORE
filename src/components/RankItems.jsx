import React from 'react'

import { 
    ico_rank_first,
    ico_rank_second,
    ico_rank_third
} from '../images'

const RankItems = props => 
    <div className="columns">

        {/* first  */}
        <div className="column">
            <figure class="image" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <img 
                    src={ ico_rank_first }  
                    alt="first"
                    width={200}
                    height={200} 
                />
            </figure>
            <h1 className="title has-text-centered">{ props.username || 'Patrick Lee' }</h1>
            <h2 className="subtitle has-text-centered">점수 : { props.score || '22' } 점</h2>
        </div>

        {/* second  */}
        <div className="column">
            <figure class="image" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <img 
                    src={ ico_rank_second }  
                    alt="second" 
                    width={200}
                    height={200}
                />
            </figure>
            <h1 className="title has-text-centered">{ props.username || "이준호"}</h1>
            <h2 className="subtitle has-text-centered">점수 : { props.score || '21'} 점</h2>
        </div>

        {/* third  */}
        <div className="column">
            <figure class="image" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <img 
                    src={ ico_rank_third }  
                    alt="third"
                    width={200}
                    height={200}
                />
            </figure>
            <h1 className="title has-text-centered">{ props.username || "새봄"}</h1>
            <h2 className="subtitle has-text-centered">점수 : { props.score || "19"} 점</h2>
        </div>
    </div>

export default RankItems