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
              className="nav-item"
              to="/FacecardForm"
            >
              <img src="" id="addCard" alt="addCard" />
            </Link>
            <Link 
                className="nav-item"
                to="/FacecardProfile"
            >
              <img src="" id="profile" alt="profile" />    
            </Link>
            <Link 
                className="nav-item"
                to="/FacecardGallery"
            >
                <img src="" id="gallery" alt="gallery" />
            </Link>
            <Link
                className="nav-item"
                to="/FacecardRank"
            >
                <img src="" id="ranking" alt="ranking" /> 
            </Link>
          </header>
          <Route exact path="/" component={FacecardMain} />
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
