import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor1, getAllPatientForDoctor2, postSendRemedy, postVerifyBookAppointment } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Table } from "react-bootstrap";

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient1: [],
            dataPatient2: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }
    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();//chuyển sang dạng d/m/y

        let res1 = await getAllPatientForDoctor1({
            doctorId: user.id,
            date: formatedDate
        })

        let res2 = await getAllPatientForDoctor2({
            doctorId: user.id,
            date: formatedDate
        })

        if (res1 && res1.data.errCode === 0) {
            this.setState({
                dataPatient1: res1.data.data
            })
        }

        if (res2 && res2.data.errCode === 0) {
            this.setState({
                dataPatient2: res2.data.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        }, async () => {//get lại API
            await this.getDataPatient();
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    handleBtnConfirmTiepNhan = async () => {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            console.log(">>>Check res", res.data)
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
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let resRemedy = await postSendRemedy({
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if (resRemedy && resRemedy.data.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send remedy succeed!")
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            toast.error("Something wrong!")
        }
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }


    render() {
        let { dataPatient1, dataPatient2, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className='container'>
                        <div className='row'>
                            <div className='manage-patient-container col-12'>
                                <div className='m-p-title'>
                                    Quản lý bệnh nhân khám bệnh
                                </div>

                                <div className='manage-patient-body row'>
                                    <div className='col-4 form-group'>
                                        <label>Chọn ngày khám</label>
                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker}
                                            className="form-control"
                                            value={this.state.currentDate}
                                        />
                                    </div>

                                    <div className='col-12 '>
                                        <Table striped bordered hover style={{ width: '100%' }}>
                                            <thead>
                                                <tr>

                                                    <th>Thời gian</th>
                                                    <th>Họ tên</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Giới tính</th>
                                                    <th>SĐT</th>
                                                    <th>Trạng thái</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            {dataPatient1 && dataPatient1.length > 0 ?
                                                dataPatient1.map((item, index) => {
                                                    let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi
                                                        :
                                                        item.timeTypeDataPatient.valueEn

                                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi
                                                        :
                                                        item.patientData.genderData.valueEn
                                                    return (
                                                        <tbody>
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{time}</td>
                                                                <td>{item.patientData.firstName}</td>
                                                                <td>{item.patientData.address}</td>
                                                                <td>{gender}</td>
                                                                <td>Đã xác nhận</td>
                                                                <td>
                                                                    <button className='btn btn-success'
                                                                        onClick={() => this.handleBtnConfirm(item)}
                                                                    >
                                                                        Gửi hoá đơn
                                                                    </button>


                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                                :
                                                <tr className='col-12'>
                                                    <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
                                                </tr>
                                            }
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />



                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
