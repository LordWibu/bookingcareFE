import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { getDetailNewsById } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailNews.scss';
import _ from 'lodash';

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailNews: {}
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailNewsById({
                newsId: id
            })

            if (res && res.data.errCode === 0) {
                this.setState({
                    dataDetailNews: res.data.data
                })
            }
        }

    }

    render() {
        let { dataDetailNews } = this.state;
        //let date = moment.unix(+dataDetailNews.updatedAt / 1000).format('dddd - DD/MM/YYYY')
        let date = moment(new Date(dataDetailNews.updatedAt)).format('DD/MM/YYYY');
        return (
            <>
                <HomeHeader />

                <div className='news-container' style={{ marginTop: '120px' }}>
                    <div className='news-title'>
                        <h2>{dataDetailNews.name}</h2>
                        <div className='news-date'>Cập nhật ngày: {date}</div>
                    </div>

                    <div className='news-content'>
                        {dataDetailNews && !_.isEmpty(dataDetailNews)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailNews.descriptionHTML }}>

                            </div>
                        }
                    </div>

                </div>

                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
