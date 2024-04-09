import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Contact.scss';
import { Modal } from 'reactstrap';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { createContact } from '../../services/userService';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            content: ''
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                gender: this.buildDataGender(this.props.genders)
            })
        }


    }
    async componentDidMount() {
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    handleConfirmBooking = async () => {

        let res = await createContact(this.state);
        console.log("Check res", res.data)
        if (res && res.data.errCode === 0) {
            toast.success('Send contact succeed!')
            this.props.closeBookingModal();

        } else {
            toast.error('Something wrong...!')
        }

    }


    render() {
        //toggle={}
        let { isOpenModal, closeBookingModal } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            Liên hệ & hợp tác
                        </span>
                        <span className='right' onClick={closeBookingModal}>
                            <i className='fas fa-times'></i>
                        </span>
                    </div>

                    <div className='booking-modal-body'>


                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>

                            <div className='col-12 form-group'>
                                <label>
                                    Nội dung
                                </label>
                                <textarea className='form-control'
                                    value={this.state.content}
                                    style={{ height: '300px' }}
                                    onChange={(event) => this.handleOnChangeInput(event, 'content')}
                                />
                            </div>


                        </div>
                    </div>

                    <div className='booking-modal-footer'>
                        <button
                            className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}>Gửi thông tin
                        </button>
                        <button
                            className='btn-booking-cancel'
                            onClick={closeBookingModal}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
