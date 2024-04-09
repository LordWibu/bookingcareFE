import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllSpecialty } from '../../../services/userService';

class MoreSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialties: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        let res = await getAllSpecialty();
        if (res && res.data.errCode === 0) {
            this.setState({
                dataSpecialties: res.data.specialties ? res.data.specialties : []
            })
        }

    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.data.errCode === 0) {
            this.setState({
                dataSpecialties: res.data.specialties ? res.data.specialties : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    render() {
        let dataSpecialties = this.state.dataSpecialties;
        console.log("Check specialty", dataSpecialties)
        return (
            <>
                <HomeHeader />

                <div className='more-specialty' style={{ marginTop: '100px' }}>
                    <div className='title-more-specialty'><span>Chuyên khoa khám</span></div>
                    <div className='specialty-body'>
                        {dataSpecialties && dataSpecialties.length > 0
                            && dataSpecialties.map((item, index) => {
                                return (
                                    <div
                                        className='specialty-child'
                                        key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreSpecialty);
