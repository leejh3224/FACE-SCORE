import React from 'react'

// static
import { 
    ico_rank_first,
    ico_rank_second,
    ico_rank_third
} from '../static'

const RankItems = props => {
    const orderedByKey = key => props.data.sort((a, b) => b[key] - a[key])
    return <div className="columns">
        { 
            orderedByKey(props.by).slice(0,3).map((record, index) => 
                <div 
                    className="column"
                    key={index}
                >
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
                            src={ index === 0 ? ico_rank_first : index === 1 ? ico_rank_second : ico_rank_third }  
                            alt="rank" 
                        />
                    </figure>
                    <h1 className="title has-text-centered">
                        { record.username }
                    </h1>
                    <h2 className="subtitle has-text-centered">점수 : { record[props.by] } 점</h2>
                </div>
            ) 
        }
    </div>
}

export default RankItems