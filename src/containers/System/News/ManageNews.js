import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageNews.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNews, getAllNews } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageNews from './TableManageNews';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',//lưu vào database
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            previewImgUrl: '',
            newsId: '',
            isOpen: false,
            isdoctor: 0
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listNews !== this.props.listNews) {
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
                isdoctor: 0
            })
        }

    }
    async componentDidMount() {
        this.props.getNewsRedux();
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    //hàm thư viện trả về content html, content dạng markdown
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    //chuyển ảnh sang định dạng base 64
    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                imageBase64: base64
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'imageBase64', 'descriptionHTML', 'descriptionMarkdown'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameters: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }


    handleCreateNews = async () => {
        let res = await createNews(this.state);

        if (res && res.data.errCode === 0) {
            toast.success('Add news succeed!')
            this.setState({
                name: '',
                imageBase64: '',//lưu vào database
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgUrl: '',
                isdoctor: 0
            })

            this.props.getNewsRedux();
        } else {
            toast.error('Something wrong...!')
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return
        }
        this.setState({
            isOpen: true
        })
    }

    handleDisplayNews = (news) => {
        let imageBase = '';
        if (news.image) {
            imageBase = news.image;
        }

        this.setState({
            name: news.name,
            imageBase64: imageBase,
            descriptionHTML: news.descriptionHTML,
            descriptionMarkdown: news.descriptionMarkdown,
            previewImgUrl: imageBase,
            newsId: news.id,
            action: CRUD_ACTIONS.EDIT,
            isdoctor: news.isdoctor
        })
    }

    handleSaveNews = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        let action = this.state.action;
        //fire redux create user
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editNewsRedux({
                id: this.state.newsId,
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                imageBase64: this.state.imageBase64,
                isdoctor: this.state.isdoctor
            })
        }
        this.props.getNewsRedux();
    }

    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>
                        Quản lý cẩm nang
                    </div>

                    <div className='add-new-specialty row'>

                        <div className='col-6 form-group'>
                            <label>Tiêu đề</label>
                            <input
                                className='form-control'
                                type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>

                        <div className='col-6 form-group image'>
                            <input id='previewImg' type='file' hidden
                                onChange={(e) => this.handleOnChangeImage(e)}

                            />
                            <label className='label-upload' htmlFor='previewImg'>Ảnh minh hoạ<i className='fas fa-upload'></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>

                        <div className='col-4 form-group isdoctor'>
                            <span>Đối tượng:</span>
                            <select name='isdoctor' onChange={(event) => this.handleOnChangeInput(event, 'isdoctor')}>

                                <option value="0">Dành cho bệnh nhân</option>
                                <option value="1">Dành cho bác sĩ</option>
                            </select>
                        </div>

                        <div className='col-12'>
                            Nội dung
                            <MdEditor
                                style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>

                        <div className='col-12'>
                            {this.state.action !== CRUD_ACTIONS.EDIT ?
                                <button className='btn-create-specialty' onClick={() => this.handleCreateNews()}>
                                    Thêm mới
                                </button>
                                :
                                <button className='btn-edit-specialty' onClick={() => this.handleSaveNews()}>
                                    Lưu thay đổi
                                </button>
                            }

                        </div>

                        <div className='col-12'>
                            <TableManageNews
                                handleDisplayNews={this.handleDisplayNews}
                                action={this.state.action}
                                getAllNews={this.props.getNewsRedux}
                            />
                        </div>

                    </div>

                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listNews: state.admin.allNews,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNewsRedux: () => dispatch(actions.fetchAllNews()),
        editNewsRedux: (data) => dispatch(actions.editNews(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNews);
