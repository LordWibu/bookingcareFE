import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class MoreDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                dataDoctor: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }

    render() {
        let dataDoctor = this.state.dataDoctor;
        let { language } = this.props;
        return (
            <>
                <HomeHeader />

                <div className='more-doctor' style={{ marginTop: '100px' }}>
                    <div className='title-more-doctor'><span>Bác sĩ nổi bật</span></div>
                    <div className='doctor-body'>
                        {dataDoctor && dataDoctor.length > 0
                            && dataDoctor.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div
                                        className='doctor-child'
                                        key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div className='bg-image doctor'
                                            style={{ backgroundImage: `url(${imageBase64})`, width: '180px', height: '180px', borderRadius: '50%' }}
                                        />

                                        <div className='text-doctor'>
                                            <div className='doctor-name'>
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </div>
                                            <div className='text-doctor-specialty'>
                                                <span>Chuyên khoa {item.Doctor_Info.specialtyData.name}</span>
                                            </div>
                                        </div>

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
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreDoctor);
