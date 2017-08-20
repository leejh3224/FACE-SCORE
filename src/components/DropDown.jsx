import React from 'react'

import '../Global.css'

const DropDown = props => 
    <div className="dropdown is-active" style={Object.assign({ position: "absolute" },props.style)}>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content" style={{ backgroundColor: "#f9f9f9" }}>
                { 
                    props.items.map(item => {
                        switch(item) {
                            case "로그아웃":
                                return (
                                    <a 
                                        className="dropdown-item"
                                        onClick={ () => props.logout(props.history) }
                                    >
                                        { item }
                                    </a>  
                                )
                            case "이미지URL만":
                                return (
                                    <a 
                                        className="dropdown-item"
                                        onClick={ props.clearURL }
                                    >
                                        { item }
                                    </a>
                                )
                            case "소개만":
                                return (
                                    <a 
                                        className="dropdown-item"
                                        onClick={ props.clearShortDescr }
                                    >
                                        { item }
                                    </a>
                                )
                            case "모두":
                                return (
                                    <a 
                                        className="dropdown-item"
                                        onClick={ props.clearAll }
                                    >
                                        { item }
                                    </a>
                                )
                            default:
                                return (
                                    <div />
                                )
                        }
                    }) 
                }
            </div>
        </div>
    </div>

export default DropDown