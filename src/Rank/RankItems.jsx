import React from 'react'

// static
import { 
    ico_rank_first,
    ico_rank_second,
    ico_rank_third
} from '../static'

const RankItems = props => 
    <div className="columns">

        {/* first  */}
        <div className="column">
            <figure 
                className="image" 
                style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto",
                    width: 120,
                    height: 120,
                }}
            >
                <img 
                    src={ ico_rank_first }  
                    alt="first" 
                />
            </figure>
            <h1 className="title has-text-centered">{ props.username || 'Patrick Lee' }</h1>
            <h2 className="subtitle has-text-centered">점수 : { props.score || '22' } 점</h2>
        </div>

        {/* second  */}
        <div className="column">
            <figure 
                className="image" 
                style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto",
                    width: 120,
                    height: 120
                }}
            >
                <img 
                    src={ ico_rank_second }  
                    alt="second" 
                />
            </figure>
            <h1 className="title has-text-centered">{ props.username || "이준호"}</h1>
            <h2 className="subtitle has-text-centered">점수 : { props.score || '21'} 점</h2>
        </div>

        {/* third  */}
        <div className="column">
            <figure 
                className="image" 
                style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto",
                    width: 120,
                    height: 120
                }}
            >
                <img 
                    src={ ico_rank_third }  
                    alt="third"
                />
            </figure>
            <h1 className="title has-text-centered">{ props.username || "새봄"}</h1>
            <h2 className="subtitle has-text-centered">점수 : { props.score || "19"} 점</h2>
        </div>
    </div>

export default RankItems