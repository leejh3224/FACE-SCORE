import React from 'react'

import { no_results } from '../static'

const NoResults = props =>
    <div>
        <img src={ no_results } alt="cat" />
        <h1 className="title is-4 has-text-centered">검색 결과가 없습니다.</h1>
        <h1 className="title is-4 has-text-centered">다시 시도해주세요.</h1>
        <a 
            className="button"
            style={{
                backgroundColor: "#6d2cf9",
                color: 'white',
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                maxWidth: 250
            }}
            onClick={ () => {
                props.goBack() 
            } }
        >돌아가기</a>
    </div>


export default NoResults