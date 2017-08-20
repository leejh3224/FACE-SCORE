import React from 'react'

import '../Global.css'

const DropDown = props => 
    <div className="dropdown is-active" style={Object.assign({ position: "absolute" },props.style)}>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content" style={{ backgroundColor: "#f9f9f9" }}>
                <a 
                    className="dropdown-item"
                    onClick={ () => props.logout(props.history) }
                >
                    로그아웃
                </a>
            </div>
        </div>
    </div>

export default DropDown