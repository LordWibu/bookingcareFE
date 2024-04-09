import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getDetailContactById } from '../../../services/userService';
import './DetailContact.scss';
import _ from 'lodash';
import Feedback from './Feedback';
import LoadingOverlay from 'react-loading-overlay';

class DetailContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailContact: {},
            isOpenModal: false,
            isShowLoading: false
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }
    componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let id = this.props.match.params.id;

        //     let res = getDetailContactById({
        //         contactId: id
        //     })

        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             dataDetailContact: res.data
        //         })
        //     }
        // }
        this.getDetailContactById();

    }

    getDetailContactById = () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            getDetailContactById({ contactId: id }).then(({ data }) => this.setState({
                dataDetailContact: data.data
            }))
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

    onChangeShowLoading = () => {
        this.setState({
            isShowLoading: !this.state.isShowLoading
        })
    }

    render() {
        let { dataDetailContact, isOpenModal, isShowLoading } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className='booking-modal-body'>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input className='form-control'
                                    value={dataDetailContact.fullName}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input className='form-control'
                                    value={dataDetailContact.phoneNumber}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    Email
                                </label>
                                <input className='form-control'
                                    value={dataDetailContact.email}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    Địa chỉ
                                </label>
                                <input className='form-control'
                                    value={dataDetailContact.address}
                                />
                            </div>

                            <div className='col-12 form-group'>
                                <label>
                                    Nội dung
                                </label>
                                <textarea className='form-control'
                                    value={dataDetailContact.content}
                                    style={{ height: '300px' }}
                                />
                            </div>

                            <div>
                                <button className='btn-phanhoi' onClick={() => this.handleDisplayFeedback()}>Phản hồi</button>
                            </div>


                        </div>

                        <Feedback
                            isOpenModal={isOpenModal}
                            closeBookingModal={this.closeBookingModal}
                            id={dataDetailContact.id}
                            onChangeShowLoading={this.onChangeShowLoading}
                        />


                    </div>
                </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailContact);
