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
            dataNewsDoctor: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        let res = await getAllNews({ params: { isdoctor: 1 } });
        if (res && res.data.errCode === 0) {
            this.setState({
                dataNewsDoctor: res.data.news ? res.data.news : []
            })
        }

    }
    async componentDidMount() {
        let res = await getAllNews({ params: { isdoctor: 1 } });
        if (res && res.data.errCode === 0) {
            this.setState({
                dataNewsDoctor: res.data.news ? res.data.news : []
            })
        }
    }

    handleViewDetailNews = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-news/${item.id}`)
        }
    }

    render() {
        let dataNewsDoctor = this.state.dataNewsDoctor;
        return (
            <>
                <HomeHeader />

                <div className='more-doctor' style={{ marginTop: '100px' }}>
                    <div className='title-more-doctor'><span>Cẩm nang cho bác sĩ</span></div>
                    <div className='doctor-body'>
                        {dataNewsDoctor && dataNewsDoctor.length > 0
                            && dataNewsDoctor.map((item, index) => {
                                let date = moment(new Date(item.createdAt)).format('DD/MM/YYYY');
                                return (
                                    <div
                                        className='doctor-child'
                                        key={index}
                                        onClick={() => this.handleViewDetailNews(item)}
                                    >
                                        <div className='bg-image doctor'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />

                                        <div className='doctor-title-content'>
                                            <div className='doctor-name'>
                                                {item.name}
                                            </div>

                                            <div className='doctor-date'>
                                                <i>Đăng ngày: {date}</i>
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
