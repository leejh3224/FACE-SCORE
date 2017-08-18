import React, { Component } from 'react'
import { connect } from "react-redux";
import { icons } from "../constants/icons"

import { showToast } from '../actions/toast'
import { 
    submitFacecard,
    submitFacecardEdit
} from "../actions/facecards";

class FacecardForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: null,
        };
    }

    componentDidMount () {

        const submit = icons[9]

        submit.getDownloadURL().then(
            url => document.getElementById("submit") ? 
                        document.getElementById("submit")
                                .src = url : undefined
        )
    }

    submitNewCard = e => {
        e.preventDefault();
        if (!this.props.facecards.submittingNew) {
            if (this.url.value) {
                let data = {
                    url: this.state.url,
                    shortDescr: this.textarea.value
                }
                this.props.submitFacecard(data);
                this.props.showToast('success', '저장되었습니다.')
            } else {
                this.props.showToast('warning', '이미지 URL란이 비었습니다.')
            }
            this.textarea.value = "";
            this.url.value = "";
        }
    };

    submitEditedCard = (e, data) => {
        e.preventDefault()
        this.props.submitFacecardEdit(data.qid, data)
        this.props.showToast('success', '수정되었습니다.')
        this.textarea.value = "";
        this.url.value = "";
    }

    handleUrlChange (event) {
        this.setState({ url: event.target.value });
    }

    showImage (url) {
        if (this.img) {
            this.img.src = url
        }
    }

    render () {
        const qidOfCardEditing = Object.keys(this.props.facecards.status)[0] || false
        return (
            this.props.auth.uid ?
            <div>
                <div 
                    className="card column is-8 is-offset-2"
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px"
                    }}
                >
                        {/* Image Uploader */}
                        <input 
                            className="input" 
                            type="text" 
                            placeholder="이미지 주소를 넣어주세요."
                            onChange={ event => this.handleUrlChange(event) }
                            ref={ url => this.url = url }
                            onTouchMove={ this.showImage(this.state.url) }
                            defaultValue={ qidOfCardEditing ? this.props.url : "" }
                            style={{
                                marginBottom: "20px"
                            }}
                        />          
                        <figure className="image" style={{ width: 'auto', height: this.state.url ? 'auto' : 250 }}>
                            <img 
                                src=""
                                ref={ img => this.img = img }
                                style={{ paddingLeft: 15 }}
                                alt="미리보기가 뜨지 않으면 사진이 표시되지 않을 수 있습니다."
                            />
                        </figure>
                    {/* Body */}
                    <div className="card-content">
                        <div className="content">
                            <textarea 
                                className="textarea is-primary" 
                                type="text" 
                                placeholder="간단하게 자신을 알려주세요"
                                rows="5"
                                ref={ textarea => this.textarea = textarea} 
                                defaultValue={ qidOfCardEditing ? this.props.shortDescr : "" }
                            >
                            </textarea>
                            <br />
                            <small>{ new Date().toLocaleString() }</small>
                            <a 
                                className="nav-right"
                                onClick={ e => {
                                    qidOfCardEditing ? 
                                        this.submitEditedCard(e, 
                                        { 
                                            qid: qidOfCardEditing, 
                                            url: this.state.url, 
                                            shortDescr: this.textarea.value 
                                        }) : this.submitNewCard(e) 
                                }}
                                style={{
                                    width: 50,
                                    marginLeft: '90%'
                                }}
                            >
                                <img id="submit" src="" alt="submit" />
                            </a>
                            <a 
                                className="button"
                                style={{
                                    position: 'relative',
                                    top: -40
                                }}
                                onClick={ () => {
                                    this.url.value = ""
                                    this.textarea.value = ""
                                }}
                            >
                                내용비우기
                            </a>
                        </div>
                    </div>
                </div>
            </div> : 
            <p>글작성을 위해서는 먼저 로그인 해주세요!</p>
        )
    }
}

const mapStateToProps = state => ({
  facecards: state.facecards,
  auth: state.auth
});

    
const mapDispatchToProps = { 
    submitFacecard,
    submitFacecardEdit,
    showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(FacecardForm);