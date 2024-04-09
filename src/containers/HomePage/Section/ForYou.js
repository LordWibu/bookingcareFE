import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ForYou.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { withRouter } from 'react-router';

class ForYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {

    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    handleViewMoreSpecialty = () => {
        this.props.history.push(`/more-specialty/`);
    }

    handleViewMoreDoctor = () => {
        this.props.history.push(`/more-doctor`);
    }

    handleViewMoreClinic = () => {
        this.props.history.push(`/more-clinic`);
    }

    handleViewMoreNews = () => {
        this.props.history.push(`/more-news`);
    }


    render() {
        return (
            <div className='section-share section-foryou'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            Dành cho bạn
                        </span>

                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            <div
                                className='section-customize foryou-child1'
                                onClick={() => this.handleViewMoreClinic()}>
                                <div className='bg-image-foryou'>

                                </div>

                                <div className='foryou-name'>Cơ sở y tế</div>
                            </div>

                            <div
                                className='section-customize foryou-child2'
                                onClick={() => this.handleViewMoreDoctor()}>
                                <div className='bg-image-foryou'>

                                </div>
                                <div className='foryou-name'>Bác sĩ</div>
                            </div>

                            <div
                                className='section-customize foryou-child3'
                                onClick={() => this.handleViewMoreSpecialty()}>
                                <div className='bg-image-foryou'>

                                </div>
                                <div className='foryou-name'>Chuyên khoa</div>
                            </div>

                            <div
                                className='section-customize foryou-child4'
                                onClick={() => this.handleViewMoreNews()}>
                                <div className='bg-image-foryou'>

                                </div>
                                <div className='foryou-name'>Bài viết</div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForYou));
