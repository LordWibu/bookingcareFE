import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailReasonById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import "./DetailSpecialty.scss";

class DetailReason extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailReason: {},
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailReasonById({
                reasonId: id,
            });
            console.log(">>>Check res", res);

            if (res && res.data.errCode === 0) {
                let data = res.data.result;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arrDoctor = data.doctorReason;
                    if (arrDoctor && arrDoctor.length > 0) {
                        arrDoctor.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailReason: res.data.result,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailReason } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />

                    <div className='detail-specialty-body'>
                        <div className='description-specialty'>
                            <div>Danh sách bác sĩ {dataDetailReason.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailReason);
