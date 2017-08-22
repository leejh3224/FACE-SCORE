import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

// components
import Terms from './Home/Terms'
import About from './Home/About'
import Contact from './Home/Contact'

import { 
  Toast,
  Confirm,
  Modal 
} from './Common'

import asyncComponent from './asyncComponent'

// static
import {
  ico_diamond,
  ico_plus,
  ico_profile,
  ico_star,
  img_logo
} from './static'

const Home = asyncComponent(() => import('./Home').then(module => module.default), { name: 'Home' })
const Form = asyncComponent(() => import('./Form').then(module => module.default), { name: 'Form' })
const Gallery = asyncComponent(() => import('./Gallery').then(module => module.default), { name: 'Gallery' })
const Rank = asyncComponent(() => import('./Rank').then(module => module.default), { name: 'Rank' })
const Profile = asyncComponent(() => import('./Profile').then(module => module.default), { name: 'Profile' })
const WelcomeModal = asyncComponent(() => import('./Welcome').then(module => module.default), { name: 'Welcome' })

class Page extends Component {

  render () {
    const qidOfCardEditing = Object.keys(this.props.facecards.status)[0] || false
    return (
      <Router>
        <div>
          { this.props.toast.isVisible ? <Toast /> : null }
          { this.props.confirm.isVisible ? 
            <Modal 
              content={

                // check some of card is waiting for editing
                qidOfCardEditing ? 
                  <Form 
                    url={ this.props.facecards.data[qidOfCardEditing].url }
                    shortDescr={ this.props.facecards.data[qidOfCardEditing].shortDescr }
                  /> : <Confirm /> } /> : null 
          }
          <header className="nav mobile-no-padding">
            <Link 
              className="nav-left nav-item"
              to="/"
            >
              <img src={ img_logo } id="logo" alt="logo" />
              <div className="nav-item is-hidden-mobile">PYPUZ</div>
            </Link>
            <Link 
              className="nav-item icon-grow"
              to="/Form"
            >
              <img src={ ico_plus } id="addCard" alt="addCard" title="카드 추가하기" />
            </Link>
            <Link 
                className="nav-item icon-grow"
                to="/Profile"
            >
              <img src={ ico_profile } id="profile" alt="profile" title="프로필 보기" />    
            </Link>
            <Link 
                className="nav-item icon-grow"
                to="/Gallery"
            >
                <img src={ ico_star } id="gallery" alt="gallery" title="갤러리 가기" />
            </Link>
            <Link
                className="nav-item icon-grow"
                to="/Rank"
            >
                <img src={ ico_diamond } id="ranking" alt="ranking" title="랭킹 보기" /> 
            </Link>
          </header>
          <Route exact path="/" component={WelcomeModal} />
          <Route path="/Home" component={Home} />
          <Route path="/Form" component={Form} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Gallery" component={Gallery} />
          <Route path="/Rank" component={Rank} />
          <Route path="/Terms" component={Terms} />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} /> 
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  confirm: state.confirm,
  toast: state.toast,
  facecards: state.facecards,
  auth: state.auth
})

export default connect(mapStateToProps, null)(Page);
