import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatientNotConfirm.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor2, postConfirmBookAppointment, deleteBooking } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Table } from "react-bootstrap";
import * as actions from './../../../store/actions';

class ManagePatientNotConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
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

        let res2 = await getAllPatientForDoctor2({
            date: formatedDate
        })

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

    handleBtnConfirmTiepNhan = async (item) => {

        await postConfirmBookAppointment({ id: item.id });
        this.getDataPatient();
    }

    handleDeleteBooking = async (item) => {
        await deleteBooking(item.id);
        toast.success("Delete Booking Succeed!");
        this.getDataPatient();
    }


    render() {
        let { dataPatient2, isOpenRemedyModal, dataModal } = this.state;
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
                                    Danh sách bệnh nhân
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

                                            {dataPatient2 && dataPatient2.length > 0 ?
                                                dataPatient2.map((item, index) => {
                                                    let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi
                                                        :
                                                        item.timeTypeDataPatient.valueEn

                                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi
                                                        :
                                                        item.patientData.genderData.valueEn
                                                    return (
                                                        <tbody>
                                                            <tr key={index}>
                                                                <td>{time}</td>
                                                                <td>{item.patientData.firstName}</td>
                                                                <td>{item.patientData.address}</td>
                                                                <td>{gender}</td>
                                                                <td>{item.phonenumber}</td>
                                                                <td>Chưa xác nhận</td>
                                                                <td>
                                                                    <button className='btn btn-warning mr-3'
                                                                        onClick={() => this.handleBtnConfirmTiepNhan(item)}
                                                                    >
                                                                        Tiếp nhận
                                                                    </button>
                                                                    <button className='btn btn-danger'
                                                                        onClick={() => this.handleDeleteBooking(item)}
                                                                    >
                                                                        Xoá lịch khám
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
                                                </tr>

                                            }
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


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
        deleteBooking: (bookingId) => dispatch(actions.deleteBooking(bookingId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatientNotConfirm);
