import React, { Component } from 'react'
import { connect } from 'react-redux'

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
import { lunatic_sky } from '../static'

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
                                <div
                                    className="column is-8 is-offset-2"
                                    style={{ 
                                        backgroundImage: `url(${ lunatic_sky })`,
                                        height: 500,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        borderRadius: 5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <h1 className="title is-5 has-text-centered has-text-white">
                                        FACESCORE 는 카드를 공유하고 서로 평가하는 공간입니다.
                                    </h1>
                                    <h1 className="title is-5 has-text-centered has-text-white">
                                        카드를 업로드하고,
                                    </h1>
                                    <h1 className="title is-5 has-text-centered has-text-white">
                                        카드를 관리하고,
                                    </h1>
                                    <h1 className="title is-5 has-text-centered has-text-white">
                                        카드를 평가하고,
                                    </h1>
                                    <h1 className="title is-5 has-text-centered has-text-white">
                                        랭킹을 확인하세요
                                    </h1>
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