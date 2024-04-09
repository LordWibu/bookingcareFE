import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManageContact.scss';
import MarkdownIt from 'markdown-it';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { getAllContact } from '../../../services/userService';
import { toast } from 'react-toastify';
import Feedback from './Feedback';


class ManageContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            listContact: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listContact !== this.state.listContact) {
            this.getAllContact();
        }

    }
    componentDidMount() {
        this.getAllContact();

    }

    getAllContact = () => {
        getAllContact().then(({ data }) => this.setState({
            listContact: data.contact
        }))
    }


    // handleOnChangeInput = (event, id) => {
    //     let stateCopy = { ...this.state };
    //     stateCopy[id] = event.target.value;
    //     this.setState({
    //         ...stateCopy
    //     })
    // }

    //hàm thư viện trả về content html, content dạng markdown

    handleDisplayContact = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-contact/${item.id}`);
        }
    }

    handleDisplayFeedback = () => {
        this.setState({
            isOpenModal: true
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {
        let listContact = this.state.listContact;
        let isOpenModal = this.state.isOpenModal;
        return (
            <>
                <div className='manage-contact-container'>
                    <div className='ms-title'>
                        Quản lý liên hệ
                    </div>

                    <div className='add-new-specialty row'>

                        <div className='col-12 table-manage-patient'>
                            <table id='manage-contact' style={{ width: '100%' }}>
                                <tr>
                                    <th>STT</th>
                                    <th>Họ tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Email</th>
                                    <th>SĐT</th>
                                    <th>Actions</th>
                                </tr>

                                {listContact && listContact.length > 0 ?
                                    listContact.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phoneNumber}</td>

                                                <td>
                                                    <button className='btn-chitiet'
                                                        onClick={() => this.handleDisplayContact(item)}
                                                    >
                                                        Chi tiết
                                                    </button>

                                                    {/* <button className='btn-phanhoi'
                                                        onClick={() => this.handleDisplayFeedback()}
                                                    >
                                                        Phản hồi
                                                    </button> */}

                                                </td>
                                            </tr>
                                        )
                                    })

                                    :
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
                                    </tr>
                                }
                            </table>
                        </div>

                    </div>

                    <Feedback
                        isOpenModal={isOpenModal}
                        closeBookingModal={this.closeBookingModal}
                    />

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageContact);
