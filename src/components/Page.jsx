import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import FacecardMain from './FacecardMain'
import FacecardGallery from './FacecardGallery'
import FacecardForm from './FacecardForm'
import FacecardRank from './FacecardRank'
import FacecardProfile from './FacecardProfile'
import Toast from './Toast'
import Confirm from './Confirm'
import Modal from './Modal'
import WelcomeModal from './WelcomeModal'

import {
  ico_diamond,
  ico_plus,
  ico_profile,
  ico_star,
  img_logo
} from '../images'

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
                  <FacecardForm 
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
              <div className="nav-item is-hidden-mobile">FACESCORE</div>
            </Link>
            <Link 
              className="nav-item icon-grow"
              to="/FacecardForm"
            >
              <img src={ ico_plus } id="addCard" alt="addCard" title="카드 추가하기" />
            </Link>
            <Link 
                className="nav-item icon-grow"
                to="/FacecardProfile"
            >
              <img src={ ico_profile } id="profile" alt="profile" title="프로필 보기" />    
            </Link>
            <Link 
                className="nav-item icon-grow"
                to="/FacecardGallery"
            >
                <img src={ ico_star } id="gallery" alt="gallery" title="갤러리 가기" />
            </Link>
            <Link
                className="nav-item icon-grow"
                to="/FacecardRank"
            >
                <img src={ ico_diamond } id="ranking" alt="ranking" title="랭킹 보기" /> 
            </Link>
          </header>
          <Route exact path="/" component={WelcomeModal} />
          <Route path="/FacecardLoggedIn" component={FacecardMain} />
          <Route path="/FacecardForm" component={FacecardForm} />
          <Route path="/FacecardProfile" component={FacecardProfile} />
          <Route path="/FacecardGallery" component={FacecardGallery} />
          <Route path="/FacecardRank" component={FacecardRank} />
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
