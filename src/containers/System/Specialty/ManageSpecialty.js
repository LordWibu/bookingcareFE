import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewSpecialty, getAllSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageSpecialty from './TableManageSpecialty';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',//lưu vào database
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            previewImgUrl: '',
            specialtyId: '',
            isOpen: false,
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listSpecialties !== this.props.listSpecialties) {
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''
            })
        }

    }
    async componentDidMount() {
        this.props.getSpecialtiesRedux();
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


    handleCreateNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);

        if (res && res.data.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                imageBase64: '',//lưu vào database
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgUrl: ''
            })
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

    handleDisplaySpecialty = (specialty) => {
        let imageBase = '';
        if (specialty.image) {
            imageBase = specialty.image;
        }

        this.setState({
            name: specialty.name,
            imageBase64: imageBase,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            previewImgUrl: imageBase,
            specialtyId: specialty.id,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    handleSaveSpecialty = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        let action = this.state.action;
        //fire redux create user
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editSpecialtyRedux({
                id: this.state.specialtyId,
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                imageBase64: this.state.imageBase64
            })
        }

    }
    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>
                        Quản lý chuyên khoa
                    </div>

                    <div className='add-new-specialty row'>

                        <div className='col-6 form-group'>
                            <label>Tên chuyên khoa</label>
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
                            <label className='label-upload' htmlFor='previewImg'>Ảnh chuyên khoa<i className='fas fa-upload'></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>

                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>

                        <div className='col-12'>
                            {this.state.action !== CRUD_ACTIONS.EDIT ?
                                <button className='btn-create-specialty' onClick={() => this.handleCreateNewSpecialty()}>
                                    Thêm mới
                                </button>
                                :
                                <button className='btn-edit-specialty' onClick={() => this.handleSaveSpecialty()}>
                                    Lưu thay đổi
                                </button>
                            }

                        </div>

                        <div className='col-12'>
                            <TableManageSpecialty
                                handleDisplaySpecialty={this.handleDisplaySpecialty}
                                action={this.state.action}
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
        listSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSpecialtiesRedux: () => dispatch(actions.fetchAllSpecialties()),
        editSpecialtyRedux: (data) => dispatch(actions.editSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
