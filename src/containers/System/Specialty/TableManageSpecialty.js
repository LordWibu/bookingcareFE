import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './TableManageSpecialty.scss';
import { getAllSpecialty, updateSpecialty } from '../../../services/userService';

class TableManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialties: [],

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialties !== this.props.listSpecialties) {
            this.setState({
                arrSpecialties: this.props.listSpecialties,
            })
        }

    }
    async componentDidMount() {
        this.props.getSpecialtiesRedux();
    }

    handleDisplaySpecialty = (specialty) => {
        this.props.handleDisplaySpecialty(specialty)
    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialtyRedux(specialty.id);
    }

    render() {
        let arrSpecialties = this.state.arrSpecialties;
        return (
            <>
                <table id='TableManageSpecialty' style={{ marginBottom: '100px' }}>
                    <tbody>
                        <tr>
                            <th>Tên chuyên khoa</th>
                            <th>Actions</th>
                        </tr>

                        {arrSpecialties && arrSpecialties.length > 0 &&
                            arrSpecialties.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleDisplaySpecialty(item)}
                                                className='btn-edit' ><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                onClick={() => this.handleDeleteSpecialty(item)}
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
        listSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSpecialtiesRedux: () => dispatch(actions.fetchAllSpecialties()),
        deleteSpecialtyRedux: (specialtyId) => dispatch(actions.deleteASpecialty(specialtyId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
