import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.data.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.data.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.data.errCode ? res.data.errCode : -1
                })
            }
        }
        if (this.props.match && this.props.match.params && this.props.match.params.id) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div style={{ marginTop: '100px' }}>
                            Loading data...
                        </div>
                        :
                        <div className='' style={{ marginTop: '100px' }}>
                            {+errCode === 0 ?
                                <div className='info-booking'>Xác nhận lịch hẹn thành công!</div>
                                :
                                <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            }
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
