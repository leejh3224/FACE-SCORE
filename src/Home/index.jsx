import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'

// components
import Gallery from '../Gallery'
import { 
    Icon,
    LoadingBar
} from '../Common'

// actions
import { 
    searchStart,
    setToInitial
} from '../actions/search'

// static
import { 
    lunatic_sky
} from '../static'

// css
import '../Global.css'

class Home extends Component {

    componentWillMount () {
        this.props.setToInitial()
    }

    render () {
        return (
            <div>
                <nav className="level">
                    <div className="level-item">
                        <p className="subtitle is-5 is-hidden-mobile">
                            총 <strong>{ this.props.search.status === "finished" ? Object.keys(this.props.search.results).length : Object.keys(this.props.facecards.data).length }</strong> 개의 카드
                        </p>
                        <div className="field has-addons" style={{ marginLeft: 10 }}>
                            <p style={{ position: 'relative' }} >
                                <input 
                                    className="input" 
                                    type="text" 
                                    placeholder="유저이름 OR 내용"
                                    ref={ searchBar => this.searchBar = searchBar }
                                    style={{
                                        borderRadius: 30,
                                        textIndent: 40,
                                        minWidth: 250,
                                        maxWidth: 350
                                    }}
                                    onKeyPress={ e => {
                                        return e.key === "Enter" ? this.props.searchStart(this.searchBar.value) : null 
                                     }
                                    }
                                />
                                <Icon
                                    style={{ left: 5 }}
                                    label={ 'search' }
                                />
                            </p>
                        </div>
                    </div>
                </nav>
                { (() => {
                    switch (this.props.search.status) {
                        default:
                            return (
                                <div>
                                    <section
                                        className="column is-12"
                                        style={{ 
                                            backgroundImage: `url(${ lunatic_sky })`,
                                            height: "75vh",
                                            width: "100vw",
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: "cover",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            fontFamily: "Sniglet, monospace", 
                                            fontSize: 40
                                        }}
                                    >
                                        <div 
                                            style={{ 
                                                width: "100%", 
                                                height: "100%",
                                                borderRadius: 5,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                margin: "auto",
                                                overflow: "hidden"
                                            }} 
                                        >
                                            <h1 className="title is-2 has-text-centered has-text-white">
                                                PYPUZ
                                            </h1>
                                            <h1 className="subtitle is-4 has-text-centered has-text-white">
                                                Pick for You, Pick for Us
                                            </h1>
                                            <Link to="/Form">
                                                <div 
                                                    className="button"
                                                    style={{
                                                        display: "block",
                                                        width: 180,
                                                        marginLeft: "auto",
                                                        marginRight: "auto",
                                                        background: '#6d2cf9',
                                                        color: 'white',
                                                        borderStyle: "none"
                                                    }}
                                                >
                                                    사진 올리러 가기
                                                </div>
                                            </Link>
                                        </div>
                                    </section>
                                    <footer 
                                        style={{ 
                                            backgroundColor: "#371249",
                                            width: "100vw",
                                            height: "10vh",
                                        }}
                                    >
                                        <nav className="breadcrumb is-centered" aria-label="breadcrumbs" style={{ marginBottom: -10 }}>
                                            <ul>
                                                <li>
                                                    <Link 
                                                        className="nav-item has-text-white"
                                                        to="/Terms"
                                                    >
                                                        Terms/Conditions
                                                    </Link>
                                                </li>
                                                <li>
                                                     <Link 
                                                        className="nav-item has-text-white"
                                                        to="/About"
                                                    >
                                                        About
                                                    </Link>
                                                </li>
                                                <li>
                                                     <Link 
                                                        className="nav-item has-text-white"
                                                        to="/Contact"
                                                    >
                                                        Contact
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                        <p className="has-text-right has-text-white" style={{ paddingRight: 20 }}>Copyright 2017. PYPUZ, all rights reserved.</p>
                                    </footer>
                                </div>
                            )
                        case "searching":
                            return (
                                <LoadingBar />
                            )
                        case "finished":
                            return (
                                <Gallery clearSearchBar={ () => this.searchBar.value = "" } />
                            )
                    }
                })() }                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search,
    facecards: state.facecards
})

const mapDispatchToProps = ({
    searchStart,
    setToInitial
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)