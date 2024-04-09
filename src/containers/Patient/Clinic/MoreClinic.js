import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllClinic } from '../../../services/userService';

class MoreClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        let res = await getAllClinic();
        if (res && res.data.errCode === 0) {
            this.setState({
                dataClinic: res.data.clinics ? res.data.clinics : []
            })
        }

    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.data.errCode === 0) {
            this.setState({
                dataClinic: res.data.clinics ? res.data.clinics : []
            })
        }
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    }

    render() {
        let dataClinic = this.state.dataClinic;
        return (
            <>
                <HomeHeader />

                <div className='more-specialty' style={{ marginTop: '100px' }}>
                    <div className='title-more-specialty'><span>Cơ sở y tế</span></div>
                    <div className='specialty-body'>
                        {dataClinic && dataClinic.length > 0
                            && dataClinic.map((item, index) => {
                                return (
                                    <div
                                        className='specialty-child'
                                        key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className='bg-image specialty'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className='specialty-name'>{item.name}</div>
                                    </div>
                                )
                            })
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreClinic);
