import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageClinic from './TableManageClinic';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',//lưu vào database
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            previewImgUrl: '',
            clinicId: '',
            isOpen: false,
            address: '',
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''
            })
        }

    }
    async componentDidMount() {
        this.props.getClinicRedux();
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
        let arrCheck = ['name', 'imageBase64', 'address', 'descriptionHTML', 'descriptionMarkdown'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameters: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }


    handleCreateNewClinic = async () => {
        let res = await createNewClinic(this.state);

        if (res && res.data.errCode === 0) {
            toast.success('Add new clinic succeed!')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',//lưu vào database
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgUrl: '',
            })
            this.props.getClinicRedux();
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

    handleDisplayClinic = (clinic) => {
        let imageBase = '';
        if (clinic.image) {
            imageBase = clinic.image;
        }

        this.setState({
            name: clinic.name,
            imageBase64: imageBase,
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            previewImgUrl: imageBase,
            clinicId: clinic.id,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    handleSaveClinic = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        let action = this.state.action;
        //fire redux create user
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editClinicRedux({
                id: this.state.clinicId,
                name: this.state.name,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                imageBase64: this.state.imageBase64
            })
        }
        this.props.getClinicRedux();

    }
    render() {
        return (
            <>
                <div className='manage-clinic-container'>
                    <div className='ms-title'>
                        Quản lý cơ sở y tế
                    </div>

                    <div className='add-new-clinic row'>

                        <div className='col-6 form-group'>
                            <label>Tên cơ sở y tế</label>
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
                            <label className='label-upload' htmlFor='previewImg'>Ảnh cơ sở y tế<i className='fas fa-upload'></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>

                        <div className='col-6 form-group'>
                            <label>Địa chỉ</label>
                            <input
                                className='form-control'
                                type='text'
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
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
                            {/* <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.addnew" />
                                    }

                                </button> */}

                            {this.state.action !== CRUD_ACTIONS.EDIT ?
                                <button className='btn-create-clinic' onClick={() => this.handleCreateNewClinic()}>
                                    Thêm mới
                                </button>
                                :
                                ""
                            }



                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                <button className='btn-edit-clinic' onClick={() => this.handleSaveClinic()}>Lưu thay đổi</button>
                                :
                                ""
                            }
                        </div>

                        <div className='col-12'>
                            <TableManageClinic
                                handleDisplayClinic={this.handleDisplayClinic}
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
        listClinic: state.admin.allClinic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClinicRedux: () => dispatch(actions.fetchAllClinic()),
        editClinicRedux: (data) => dispatch(actions.editClinic(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
