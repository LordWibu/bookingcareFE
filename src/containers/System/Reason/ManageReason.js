import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { CRUD_ACTIONS } from '../../../utils';
import { createNewReason, getAllReason, updateReason, deleteReason, getDetailReasonById, getAllSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import 'react-image-lightbox/style.css';

class ManageReason extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            listSpecialty: [],
            action: '',
            dataReason: [],
            specialtyId: '',
            reasonId: ''
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log(">>>", res.data)

        this.setState({
            listSpecialty: res.data.specialties,
            specialtyId: res.data.specialties[0].id
        })
        this.getAllReason();
    }

    getAllReason = async () => {
        let res2 = await getAllReason();
        this.setState({
            dataReason: res2.data.reasons
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleCreateReason = async () => {
        let res = await createNewReason(this.state);

        if (res && res.data.errCode === 0) {
            toast.success('Add reason succeed!')
            this.setState({
                name: '',
                specialtyId: ''
            })

        } else {
            toast.error('Something wrong...!')
        }
        this.getAllReason();
    }

    handleDisplayReason = (reason) => {
        this.setState({
            reasonId: reason.id,
            name: reason.name,
            specialtyId: reason.specialtyId,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    handleDeleteReason = async (data) => {
        await deleteReason(data.id);
        toast.success("Delete reason succeed!")
        this.getAllReason();
    }

    handleSaveReason = async () => {
        let action = this.state.action;
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editReasonRedux(
                {
                    id: this.state.reasonId,
                    name: this.state.name,
                    specialtyId: this.state.specialtyId
                }
            )
        }
        this.getAllReason();
    }

    handleChangeSpecialty = (e) => {
        this.setState({
            specialtyId: e.target.value
        })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='text-center mt-3'>
                        <h3>Quản lý Lý Do Khám</h3>
                    </div>

                    <div className='add-new-specialty row'>

                        <div className='col-6 form-group'>
                            <label>Tiêu đề</label>
                            <input
                                className='form-control'
                                type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnChangeText(event, 'name')}
                            />
                        </div>

                        <div className='col-4 form-group'>
                            <label>Chuyên khoa</label>
                            <br />
                            <select className='pt-2 pb-2' style={{ width: '100%', borderRadius: '3px' }} onChange={this.handleChangeSpecialty}>
                                {
                                    this.state.listSpecialty.map(item => {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='col-10 mb-5'>
                            {this.state.action !== CRUD_ACTIONS.EDIT ?
                                <button className='btn btn-info' onClick={() => this.handleCreateReason()}>
                                    Thêm mới
                                </button>
                                :
                                <button className='btn-warning btn' onClick={() => this.handleSaveReason()}>
                                    Lưu thay đổi
                                </button>
                            }

                        </div>

                        <div className='col-10'>
                            <table className='table border center'>
                                <thead>
                                    <th>Lý do khám</th>
                                    <th>Chuyên khoa</th>
                                    <th>Actions</th>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dataReason.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.specialtyId}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => this.handleDisplayReason(item)}
                                                            className='btn-edit' ><i className='fas fa-pencil-alt'></i></button>
                                                        <button
                                                            onClick={() => this.handleDeleteReason(item)}
                                                            className='btn-delete' ><i className='fas fa-trash'></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        editReasonRedux: (data) => dispatch(actions.editReason(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageReason);
