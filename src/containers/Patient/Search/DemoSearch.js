import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllSpecialty, getAllDoctorService, getAllClinic, getAllReason } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './DemoSearch.scss';

class DemoSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: [],
            dataClinic: [],
            dataSpecialty: [],
            dataReason: [],
            search: ''
        }
    }

    getDataLoad = async () => {
        const searchParam = new URLSearchParams(window.location.search);
        this.setState({
            search: searchParam.get('keyword')
        })

        let resSpecialty = await getAllSpecialty({
            params: { keyword: searchParam.get('keyword') }
        })

        let resClinic = await getAllClinic({
            params: { keyword: searchParam.get('keyword') }
        })

        let resDoctor = await getAllDoctorService({
            params: { keyword: searchParam.get('keyword') }
        })

        let resReason = await getAllReason({
            params: { keyword: searchParam.get('keyword') }
        })


        if (resDoctor && resDoctor.data.errCode === 0) {
            this.setState({
                dataDoctor: resDoctor.data.data,
            })
        }
        if (resClinic && resClinic.data.errCode === 0) {
            this.setState({
                dataClinic: resClinic.data.clinics,
            })
        }

        if (resSpecialty && resSpecialty.data.errCode === 0) {
            this.setState({
                dataSpecialty: resSpecialty.data.specialties,
            })
        }

        if (resReason && resReason.data.errCode === 0) {
            this.setState({
                dataReason: resReason.data.reasons,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {

        this.getDataLoad();

    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    handleViewDetailReason = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-reason/${item.id}`);
        }
    }

    handleOnChangeInputSearch = async (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handlekeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleSearch(e.target);
        }
    }

    handleSearch = (element) => {
        let { search } = this.state;
        if (this.state.search !== '') {
            this.props.history.push(`/search?keyword=${search}`)
            this.getDataLoad();
        } else {
            element.blur();
        }
    }

    render() {
        let { dataDoctor, dataClinic, dataSpecialty, dataReason, search } = this.state;
        let { language } = this.props;

        return (
            <>
                <HomeHeader />
                <div className='search-container'>
                    <div className='search-input' style={{ marginTop: '100px' }}>
                        <i className='fas fa-search'></i>
                        <input type='text' placeholder='Tìm kiếm ...'
                            onChange={(e) => this.handleOnChangeInputSearch(e)}
                            onKeyDown={(e) => this.handlekeyDown(e)}
                            value={search || ''}
                        />
                    </div>

                    <div className='doctor-title'>Lý do khám</div>
                    <div className='data-doctor'>
                        {
                            dataReason.length ? dataReason.map((item, index) => {
                                return (
                                    <div className='search-doctor' onClick={() => this.handleViewDetailReason(item)}>
                                        <div className='doctor-text'>
                                            <div className='doctor-name'>{item.name}</div>
                                        </div>
                                    </div>
                                )
                            })
                                :
                                <div className='no-doctor'><span>0 Kết Quả</span></div>
                        }
                    </div>


                    <div className='doctor-title'>Bác sĩ</div>
                    <div className='data-doctor'>

                        {dataDoctor.length ? dataDoctor.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                            return (
                                <div className='search-doctor' onClick={() => this.handleViewDetailDoctor(item)}>
                                    <div className='bg-image-search-doctor'
                                        style={{ backgroundImage: `url(${imageBase64})` }}

                                    />
                                    <div className='doctor-text'>
                                        <div className='doctor-name'>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                                        <div className='text-specialty'>Chuyên khoa {item.Doctor_Info.specialtyData.name}</div>
                                    </div>
                                </div>
                            )
                        })
                            :
                            <div className='no-doctor'><span>0 Kết Quả</span></div>
                        }
                    </div>

                    <div className='doctor-title'>Cơ sở y tế</div>
                    <div className='data-clinic'>

                        {dataClinic.length ? dataClinic.map((item, index) => {

                            return (
                                <div className='search-clinic' onClick={() => this.handleViewDetailClinic(item)}>
                                    <div className='bg-image-search-clinic'
                                        style={{ backgroundImage: `url(${item.image})` }}

                                    />
                                    <div className='clinic-text'>
                                        <div>{item.name}</div>
                                    </div>
                                </div>

                            )
                        })
                            :
                            <div className='no-clinic'><span>0 Kết Quả</span></div>
                        }
                    </div>

                    <div className='doctor-title'>Chuyên khoa</div>
                    <div className='data-specialty'>

                        {dataSpecialty.length ? dataSpecialty.map((item, index) => {
                            return (
                                <div className='search-specialty' onClick={() => this.handleViewDetailSpecialty(item)}>
                                    <div className='bg-image-search-specialty'
                                        style={{ backgroundImage: `url(${item.image})` }}

                                    />
                                    <div className='specialty-text'>
                                        <div>Chuyên khoa {item.name}</div>
                                    </div>
                                </div>
                            )
                        })
                            :
                            <div className='no-specialty'><span>0 Kết Quả</span></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DemoSearch);
