import React from 'react'

const Icon = props =>
     <span 
        className="icon is-medium icon-above-image" 
        style={ props.style }
    >
        <a
            style={{
                color: "#7d0096"
            }}
            onClick={ props.onClick }
        >
            <i className={ `fa fa-${ props.label }` } />
        </a>
        { props.label === "star" ? 
            <p style={{ marginLeft: 5, color: 'black' }}>
                { props.score }
            </p> : null }
    </span>

export default Icon