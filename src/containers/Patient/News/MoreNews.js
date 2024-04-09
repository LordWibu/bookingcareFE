import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import './MoreNews.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllNews } from '../../../services/userService';

class MoreNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNews: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        let res = await getAllNews({ params: { isdoctor: 0 } });
        if (res && res.data.errCode === 0) {
            this.setState({
                dataNews: res.data.news ? res.data.news : []
            })
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
            this.props.history.push(`/detail-news/${item.id}`);
        }
    }

    render() {
        let dataNews = this.state.dataNews;
        return (
            <>
                <HomeHeader />

                <div className='more-news' style={{ marginTop: '100px' }}>
                    <div className='title-more-news'><span>Cẩm nang</span></div>
                    <div className='news-body'>
                        {dataNews && dataNews.length > 0
                            && dataNews.map((item, index) => {
                                let date = moment(new Date(item.createdAt)).format('DD/MM/YYYY');
                                return (
                                    <div
                                        className='news-child'
                                        key={index}
                                        onClick={() => this.handleViewDetailNews(item)}
                                    >
                                        <div className='bg-image news'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />

                                        <div className='news-title-content'>
                                            <div className='news-name'>
                                                {item.name}
                                            </div>

                                            <div className='news-date'>
                                                <i> Ngày đăng : {date}</i>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreNews);
