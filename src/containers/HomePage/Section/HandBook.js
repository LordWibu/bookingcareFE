import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllNews } from '../../../services/userService';
import { withRouter } from 'react-router';


class HandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNews: []
        }
    }

    async componentDidMount() {
        let res = await getAllNews({ params: { isdoctor: 0 } });
        if (res && res.data.errCode === 0) {
            this.setState({
                dataNews: res.data.news ? res.data.news : []
            })
        }
    }

    handleViewDetailNews = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-news/${item.id}`)
        }
    }

    handleViewMoreNews = () => {
        this.props.history.push(`/more-news`);
    }

    render() {
        let { dataNews } = this.state;
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'
                            onClick={() => this.handleViewMoreNews()}
                        >XEM THÊM</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {dataNews && dataNews.length > 0
                                && dataNews.map((item, index) => {
                                    return (
                                        <div className='section-customize'
                                            key={index}
                                            onClick={() => this.handleViewDetailNews(item)}
                                        >
                                            <div className='bg-image section-handbook'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='news-name' style={{ width: '280px', textAlign: 'justify', fontWeight: '600' }}>
                                                {item.name}
                                            </div>
                                        </div>

                                    )
                                })}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
