import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo_bookingcare.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { changeLanguageApp } from '../../store/actions';
import Contact from './Contact';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            isOpenModalBooking: false,
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleChangeInput = (e) => {
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

        if (this.state.search !== '') {
            this.props.history.push(`/search?keyword=${this.state.search}`)

        } else {
            element.blur();
        }
    }

    handleViewMoreSpecialty = () => {
        this.props.history.push(`/more-specialty/`);
    }

    handleViewMoreClinic = () => {
        this.props.history.push(`/more-clinic`);
    }

    handleViewMoreDoctor = () => {
        this.props.history.push(`/more-doctor`);
    }

    handleToLogin = () => {
        this.props.history.push(`/login`);
    }

    handleViewMentalHealth = () => {
        this.props.history.push(`/detail-specialty/9`)
    }

    handleViewTeethHealth = () => {
        this.props.history.push(`/detail-specialty/7`)
    }

    handleViewForFarHealth = () => {
        this.props.history.push(`/detail-specialty/12`)
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    handleOpenContact = () => {
        this.setState({
            isOpenModalBooking: true
        })
    }

    render() {
        let language = this.props.language;
        let isOpenModalBooking = this.state.isOpenModalBooking;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>

                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                        </div>

                        <div className='center-content'>
                            <div className='child-content' onClick={() => this.handleViewMoreSpecialty()}>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>

                            <div className='child-content' onClick={() => this.handleViewMoreClinic()}>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>

                            <div className='child-content' onClick={() => this.handleViewMoreDoctor()}>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>

                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div
                                className='login-doctor-admin'
                                onClick={() => this.handleToLogin()}
                            >
                                Login
                            </div>
                            <div className='support'>
                                <i className='fas fa-question-circle'></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}><b>VN</b></span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}><b>EN</b></span>
                            </div>
                        </div>

                    </div>
                </div>

                {this.props.isShowBanner == true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className='search'

                            >
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm chuyên khoa, bác sĩ, cơ sở y tế'
                                    onChange={(e) => this.handleChangeInput(e)}
                                    value={this.state.search || ''}
                                    onKeyDown={(e) => this.handlekeyDown(e)}
                                />
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>

                                <div className='option-child' onClick={() => this.handleViewMoreSpecialty()}>
                                    <div className='icon-child'>
                                        <i className='far fa-hospital'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>

                                <div className='option-child' onClick={() => this.handleViewForFarHealth()} >
                                    <div className='icon-child'>
                                        <i class="fa fa-mobile"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fa fa-procedures'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>

                                <div className='option-child' onClick={() => this.handleOpenContact()}>
                                    <div className='icon-child'>
                                        <i className='fas fa-flask'></i>
                                    </div>
                                    <div className='text-child'>
                                        Liên hệ & hợp tác
                                    </div>
                                </div>

                                <div className='option-child' onClick={() => this.handleViewMentalHealth()}>
                                    <div className='icon-child'>
                                        <i className='fa fa-user-md'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>

                                <div className='option-child' onClick={() => this.handleViewTeethHealth()}>
                                    <div className='icon-child'>
                                        <i className='fa fa-medkit'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Contact
                            isOpenModal={isOpenModalBooking}
                            closeBookingModal={this.closeBookingModal}
                        />

                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
