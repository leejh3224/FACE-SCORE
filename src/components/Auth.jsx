import React from "react";
import { connect } from "react-redux";
import { openAuth, logoutUser } from "../actions/auth";
import C from "../constants";
import styles from '../Global.css'

const Auth = props => {
  switch (props.auth.status) {
    case C.AUTH_LOGGED_IN:
      return (
        <p>
          <span>{props.auth.username} 님 환영홥니다.</span>
          {" "}<button onClick={props.logoutUser}>Log out</button>
        </p>
      );
    case C.AUTH_AWAITING_RESPONSE:
      return (
        <p>
          <button disabled>authenticating...</button>
        </p>
      );
    default:
      return (
        <div>
            <a 
              className="button is-info"
              onClick={props.openAuth}
            >
              <span className="icon">
                <i className="fa fa-facebook"></i>
              </span>
              <span className={ styles.bold }>페이스북으로 계속하기</span>
            </a>
        </div>
      )
  }
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  openAuth,
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
