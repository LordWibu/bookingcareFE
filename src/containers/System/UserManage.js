import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllContact,
    getAllNews,
    getAllClinic,
    getAllSpecialty,
    getAllDoctorService,
    getAllBooking,
} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import 'bootstrap/dist/css/bootstrap.min.css';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            arrDoctor: [],
            arrNew: [],
            arrClinic: [],
            arrSpecialty: [],
            arrContact: [],
            arrBooking: []
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
        let res1 = await getAllDoctorService();
        let res2 = await getAllClinic();
        let res3 = await getAllNews();
        let res4 = await getAllSpecialty();
        let res5 = await getAllContact();
        let res6 = await getAllBooking();
        if (res1 && res1.data) {
            this.setState({
                arrDoctor: res1.data.data
            })
        }
        if (res2 && res2.data) {
            this.setState({
                arrClinic: res2.data.clinics
            })
        }
        if (res3 && res3.data) {
            this.setState({
                arrNew: res3.data.news
            })
        }
        if (res4 && res4.data) {
            this.setState({
                arrSpecialty: res4.data.specialties
            })
        }
        if (res5 && res5.data) {
            this.setState({
                arrContact: res5.data.contact
            })
        }
        if (res6 && res6.data) {
            this.setState({
                arrBooking: res6.data.booking
            })
        }
    }

    getAllUsersFromReact = async () => {
        let res = await getAllUsers('All');
        if (res && res.data.errCode === 0) {
            this.setState({
                arrUsers: res.data.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (dat) => {
        try {
            let res = await createNewUserService(dat);
            if (res && res.data.errCode !== 0) {
                alert(res.data.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.data.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.data.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.data.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
            } else {
                alert(res.data.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //LifeCycle
    //1. Run constructor > init state
    //2. Did mount
    //3. Render

    render() {
        let { arrClinic, arrContact, arrDoctor, arrNew, arrSpecialty, arrBooking } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className='title text-center mb-5'>
                    Trang chủ quản trị
                </div>

                <div className='container mt-5'>
                    <div className='row'>

                        <div className='col-4 mb-5' style={{ display: 'flex', }}>
                            <div className='mr-3' style={{ backgroundColor: '#0071ba', borderRadius: '5px', padding: '22px 40px' }}>
                                <i className="fas fa-calendar-minus fa-5x" style={{ color: 'white' }}></i>
                            </div>
                            <div className='pt-4'>
                                <h3>{arrBooking.length}</h3>
                                <h6 style={{ color: '#666', fontSize: '18px' }}>Lịch khám được đặt</h6>
                            </div>
                        </div>

                        <div className='col-4 mb-5' style={{ display: 'flex', }}>
                            <div className='mr-3' style={{ backgroundColor: '#87ee8e', borderRadius: '5px', padding: '22px 40px' }}>
                                <i className="fas fa-user-md fa-5x" style={{ color: 'white' }}></i>
                            </div>
                            <div className='pt-4'><h3>{arrDoctor.length}</h3><h6 style={{ color: '#666', fontSize: '18px' }}>Bác sĩ</h6></div>
                        </div>

                        <div className='col-4 mb-5' style={{ display: 'flex' }}>
                            <div className='mr-3' style={{ backgroundColor: '#f0bcf3', borderRadius: '5px', padding: '22px 34px' }}>
                                <i className="fas fa-comment-medical fa-5x" style={{ color: 'white' }}></i>
                            </div>
                            <div className='pt-4'><h3>{arrSpecialty.length}</h3><h6 style={{ color: '#666', fontSize: '18px' }}>Chuyên khoa</h6></div>
                        </div>

                        <div className='col-4 mb-5' style={{ display: 'flex', }}>
                            <div className='mr-3' style={{ backgroundColor: '#88dbe4', borderRadius: '5px', padding: '22px 34px' }}>
                                <i className="fas fa-clinic-medical fa-5x" style={{ color: 'white' }}></i>
                            </div>
                            <div className='pt-4'><h3>{arrClinic.length}</h3><h6 style={{ color: '#666', fontSize: '18px' }}>Cơ sở y tế</h6></div>
                        </div>

                        <div className='col-4 mb-5' style={{ display: 'flex', }}>
                            <div className='mr-3' style={{ backgroundColor: '#ee89a9', borderRadius: '5px', padding: '22px 45px' }}>
                                <i className="fas fa-phone-volume fa-5x" style={{ color: 'white' }}></i>
                            </div>
                            <div className='pt-4'><h3>{arrContact.length}</h3><h6 style={{ color: '#666', fontSize: '18px' }}>Liên hệ</h6></div>
                        </div>

                        <div className='col-4 mb-5' style={{ display: 'flex', }}>
                            <div className='mr-3' style={{ backgroundColor: '#ede763', borderRadius: '5px', padding: '22px 32px' }}>
                                <i className="far fa-newspaper fa-5x" style={{ color: 'white' }}></i>
                            </div>
                            <div className='pt-4'><h3>{arrNew.length}</h3><h6 style={{ color: '#666', fontSize: '18px' }}>Bài viết</h6></div>
                        </div>

                        {

                            <div className='col-12 mt-4'>
                                <h4>Danh sách bác sĩ</h4>
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <th>Email</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Address</th>
                                            <th>Phone Number</th>
                                            <th>Gender</th>
                                        </tr>

                                        {arrDoctor && arrDoctor.map((item, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{item.email}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.lastName}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.phonenumber}</td>
                                                        <td>{item.gender}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>}
                    </div>
                </div>



            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
