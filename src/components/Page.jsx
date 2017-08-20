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

import { icons, iconNames } from '../constants/icons'

class Page extends Component {

  downloadImages (FSicons) {
    if (FSicons.length) {
      FSicons.map((icon, index) => 
        icon.getDownloadURL().then(
          url => {

            // if elements need images
            if (document.getElementById(iconNames[index])) {
              document.getElementById(iconNames[index]).src = url
            }
          }
        )
      )
    }
  }

  componentDidMount() {
    this.downloadImages(icons)
  }

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
              <img src="" id="logo" alt="logo" />
              <div className="nav-item is-hidden-mobile">FACESCORE</div>
            </Link>
            <Link 
              className="nav-item icon-grow"
              to="/FacecardForm"
            >
              <img src="" id="addCard" alt="addCard" title="카드 추가하기" />
            </Link>
            <Link 
                className="nav-item icon-grow"
                to="/FacecardProfile"
            >
              <img src="" id="profile" alt="profile" title="프로필 보기" />    
            </Link>
            <Link 
                className="nav-item icon-grow"
                to="/FacecardGallery"
            >
                <img src="" id="gallery" alt="gallery" title="갤러리 가기" />
            </Link>
            <Link
                className="nav-item icon-grow"
                to="/FacecardRank"
            >
                <img src="" id="ranking" alt="ranking" title="랭킹 보기" /> 
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

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);
