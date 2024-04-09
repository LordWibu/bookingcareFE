import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';

import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfo: {}
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.data.errCode === 0) {
                this.setState({
                    extraInfo: res.data.data
                })
            }
            console.log("Check extra", this.state.extraInfo)
        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.data.errCode === 0) {
                this.setState({
                    extraInfo: res.data.data
                })
            }
        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetail: status
        })
    }

    render() {
        let { isShowDetail, extraInfo } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id="patient.extra-info-doctor.text-address" />
                        </div>
                        <div className='name-clinic'>
                            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                        </div>
                        <div className='detail-address'>
                            {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                        </div>
                    </div>

                    <div className='content-down'>
                        {isShowDetail === false &&
                            <div className='short-info'>
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                                <b><i>
                                    {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfo.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    }

                                    {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfo.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'USD'}
                                        />
                                    }
                                </i></b>
                                <div>
                                    <span className='detail' onClick={() => this.showHideDetailInfo(true)}>
                                        <FormattedMessage id="patient.extra-info-doctor.detail" />
                                    </span>
                                </div>
                            </div>
                        }

                        {isShowDetail === true &&
                            <>
                                <div className='title-price'>
                                    <FormattedMessage id="patient.extra-info-doctor.price" />
                                </div>
                                <div className='detail-info'>
                                    <div className='price'>
                                        <span className='left'>
                                            <FormattedMessage id="patient.extra-info-doctor.price" />
                                        </span>
                                        <span className='right'>
                                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                                &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfo.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            }

                                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                                &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfo.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'USD'}
                                                />
                                            }
                                        </span>
                                    </div>

                                    <div className='note'>
                                        {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                        <p>Giá khám đã bao gồm phí đặt lịch hẹn trước (Giá niêm yết của phòng khám)</p>
                                        <p>Giá khám cho người nước ngoài là 30 USD</p>
                                        <p>Giá tái khám:
                                            Theo chỉ định của bác sĩ</p>
                                    </div>
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id="patient.extra-info-doctor.payment" />
                                    {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI
                                        ? extraInfo.paymentTypeData.valueVi : ''
                                    }

                                    {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN
                                        ? extraInfo.paymentTypeData.valueEn : ''
                                    }
                                </div>
                                <div className='hide-price'>
                                    <span onClick={() => this.showHideDetailInfo(false)}>
                                        <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                    </span></div>

                            </>

                        }


                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
