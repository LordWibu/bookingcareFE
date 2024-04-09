import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getDetailNewsDoctorById } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailNews.scss';
import _ from 'lodash';

class DetailNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailNewsDoctor: {}
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailNewsDoctorById({
                newsId: id
            })

            console.log("Check res", res.data)
            if (res && res.data.errCode === 0) {
                this.setState({
                    dataDetailNewsDoctor: res.data.data
                })
            }
        }

    }

    render() {
        let { dataDetailNewsDoctor } = this.state;
        return (
            <>
                <HomeHeader />

                <div className='news-container' style={{ marginTop: '120px' }}>
                    <div className='news-title'>
                        <h2>{dataDetailNewsDoctor.name}</h2>
                        <div className='news-date'>Cập nhật ngày: {dataDetailNewsDoctor.updatedAt}</div>
                    </div>

                    <div className='news-content'>
                        {dataDetailNewsDoctor && !_.isEmpty(dataDetailNewsDoctor)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailNewsDoctor.descriptionHTML }}>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailNews);
