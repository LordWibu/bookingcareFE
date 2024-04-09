import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Feedback.scss';
import { Modal } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { sendMailFeedback } from '../../../services/userService';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

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

    handleConfirmBooking = (id) => {
        this.props.onChangeShowLoading();
        sendMailFeedback(this.state, id).then((res) => {
            if (res.errMessage === "Send Feedback succeed!") {
                toast.success('Send feedback succeed!')
                this.props.closeBookingModal();
                this.props.onChangeShowLoading();

            } else {
                toast.success('Send feedback succeed!')
                this.props.closeBookingModal();
                this.props.onChangeShowLoading();
            }
        });

    }


    render() {
        //toggle={}
        let { isOpenModal, closeBookingModal, id } = this.props;
        return (
            <>

                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                Phản hồi liên hệ
                            </span>
                            <span className='right' onClick={closeBookingModal}>
                                <i className='fas fa-times'></i>
                            </span>
                        </div>

                        <div className='booking-modal-body'>


                            <div className='row'>
                                <div className='col-12 form-group'>
                                    <label>
                                        Nội dung
                                    </label>
                                    <textarea className='form-control'
                                        style={{ height: '350px' }}
                                        value={this.state.feedback}
                                        onChange={(event) => this.handleOnChangeInput(event, 'feedback')}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className='booking-modal-footer'>
                            <button
                                className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking(id)}>Gửi phản hồi
                            </button>
                            <button
                                className='btn-booking-cancel'
                                onClick={closeBookingModal}>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
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
