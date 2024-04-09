import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './TableManageNews.scss';
import { getAllNews, updateNews } from '../../../services/userService';

class TableManageNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNews: [],

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listNews !== this.props.listNews) {
            this.setState({
                arrNews: this.props.listNews,
            })
        }

    }
    async componentDidMount() {
        this.props.getNewsRedux();
    }

    handleDisplayNews = (news) => {
        this.props.handleDisplayNews(news)
    }

    handleDeleteNews = (news) => {
        this.props.deleteNewsRedux(news.id);
        this.props.getAllNews();
    }

    render() {
        let arrNews = this.state.arrNews;
        return (
            <>
                <table id='TableManageNews' style={{ marginBottom: '100px' }}>
                    <tbody>
                        <tr>
                            <th>Tên bài viết</th>
                            <th>Actions</th>
                        </tr>

                        {arrNews && arrNews.length > 0 &&
                            arrNews.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleDisplayNews(item)}
                                                className='btn-edit' ><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                onClick={() => this.handleDeleteNews(item)}
                                                className='btn-delete' ><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}

                    </tbody>
                </table>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listNews: state.admin.allNews,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNewsRedux: () => dispatch(actions.fetchAllNews()),
        deleteNewsRedux: (newsId) => dispatch(actions.deleteANews(newsId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageNews);
