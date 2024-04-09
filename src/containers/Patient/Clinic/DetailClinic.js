import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        this.setBackground(this.state.dataDetailClinic.image);

    }
    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                clinicId: id,
            });

            if (res && res.data.errCode === 0) {
                let data = res.data.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arrDoctor = data.doctorClinic;
                    if (arrDoctor && arrDoctor.length > 0) {
                        arrDoctor.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailClinic: data,
                })
            }
        }
    }

    setBackground = (url) => {
        document.querySelector('.description-specialty img').src = url;
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />

                    <div className='detail-specialty-body'>
                        <div className='description-specialty'>

                            {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                &&
                                <>
                                    <div style={{ position: "relative" }} dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                    </div>
                                </>
                            }
                        </div>

                        {arrDoctorId && arrDoctorId.length > 0
                            && arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDesscriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={true}
                                                //dataTime ={dataTime}
                                                />
                                            </div>
                                        </div>

                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule '>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                                {/* <div className='doctor-schedule-container '></div>(div bên doctor schedule) */}
                                            </div>

                                            <div className='doctor-extra-info'>
                                                {/* <div className='doctor-extra-info-container'></div>(div bên doctorExtraInfo) */}
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);