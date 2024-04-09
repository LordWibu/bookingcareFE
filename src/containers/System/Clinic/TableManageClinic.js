import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './TableManageClinic.scss';
import { getAllClinic, updateClinic } from '../../../services/userService';

class TableManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                arrClinic: this.props.listClinic,
            })
        }

    }
    async componentDidMount() {
        this.props.getClinicRedux();
    }

    handleDisplayClinic = (clinic) => {
        this.props.handleDisplayClinic(clinic)
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id);
        this.props.getClinicRedux();
    }

    render() {
        let arrClinic = this.state.arrClinic;
        return (
            <>
                <table id='TableManageClinic' style={{ marginBottom: '100px' }}>
                    <tbody>
                        <tr>
                            <th>Tên cơ sở y tế</th>
                            <th>Actions</th>
                        </tr>

                        {arrClinic && arrClinic.length > 0 &&
                            arrClinic.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleDisplayClinic(item)}
                                                className='btn-edit' ><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                onClick={() => this.handleDeleteClinic(item)}
                                                className='btn-delete' ><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}

                    </tbody>
                </table>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listClinic: state.admin.allClinic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClinicRedux: () => dispatch(actions.fetchAllClinic()),
        deleteClinicRedux: (clinicId) => dispatch(actions.deleteAClinic(clinicId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
