import React, { Component } from 'react'
import { connect } from "react-redux"

// components
import { DropDown } from '../Common'

// actions
import { showToast } from '../actions/toast'
import { 
    submitFacecard,
    submitFacecardEdit
} from "../actions/facecards"

// static
import { 
    ico_submit,
    ico_preview
} from '../static'

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            makeEmptyExpanded: false
        };
    }
    
    submitNewCard = e => {
        e.preventDefault()
        if (!this.props.facecards.submittingNew) {
            if (this.url.value) {
                let data = {
                    url: this.url.value,
                    shortDescr: this.textarea.value
                }
                this.props.submitFacecard(data)
                this.props.showToast('success', '저장되었습니다.')
            } else {
                this.props.showToast('warning', '이미지 URL란이 비었습니다.')
            }
            this.textarea.value = ""
            this.url.value = ""
            this.img.src = ico_preview
        }
    };

    submitEditedCard = (e, data) => {
        e.preventDefault()
        this.props.submitFacecardEdit(data.qid, data)
        this.props.showToast('success', '수정되었습니다.')
        this.textarea.value = ""
        this.url.value = ""
        this.img.src = ico_preview
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
            <div
                onClick={
                    this.state.makeEmptyExpanded ? 
                    () => this.setState(prev => ({
                        ...prev,
                        makeEmptyExpanded: !prev.makeEmptyExpanded
                    })) : null
                }
            >
                <div 
                    className="card column is-6 is-offset-3"
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderRadius: 10
                    }}
                >
                        {/* Image Uploader */}
                        <input 
                            className="input" 
                            type="text" 
                            placeholder="이미지 주소를 넣어주세요."
                            onChange={ event => this.showImage(event.target.value) }
                            ref={ url => this.url = url }
                            defaultValue={ qidOfCardEditing ? this.props.url : "" }
                            style={{
                                marginBottom: "20px"
                            }}
                        />          
                        <figure className="image" style={{ width: 'auto', height: 'auto' }}>
                            <img 
                                src={ this.props.url ? this.props.url : ico_preview }
                                ref={ img => this.img = img }
                                style={{ paddingLeft: 15 }}
                                alt="미리보기"
                            />
                        </figure>

                    {/* Body */}
                    <div className="card-content">
                        { this.props.auth.username && this.state.makeEmptyExpanded ?
                            <DropDown
                                style={{ bottom: 120, left: 105 }}
                                items={['이미지URL만', '소개만', '모두']}
                                clearURL={ () => this.url.value = "" }
                                clearShortDescr={ () => this.textarea.value = "" }
                                clearAll={ () => { 
                                    this.url.value = "" 
                                    this.textarea.value= ""
                                }}
                            /> : null
                        }
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
                                            url: this.url.value, 
                                            shortDescr: this.textarea.value 
                                        }) : this.submitNewCard(e) 
                                }}
                                style={{
                                    width: 50,
                                    marginLeft: '90%'
                                }}
                            >
                                <img src={ ico_submit } alt="submit" />
                            </a>
                            <a 
                                className="button is-danger"
                                style={{
                                    position: 'relative',
                                    top: -40
                                }}
                                onClick={ () => {
                                    this.setState(prev => ({
                                        ...prev,
                                        makeEmptyExpanded: !prev.makeEmptyExpanded
                                    }))
                                }}
                            >
                                비우기
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);