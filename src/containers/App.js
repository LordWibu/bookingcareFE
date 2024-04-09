import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils';

import Home from '../routes/Home';
import Login from './Auth/Login';
import HomePage from './HomePage/HomePage.js';
import System from '../routes/System';
import DetailDoctor from './Patient/Doctor/DetailDoctor.js';
import Doctor from '../routes/Doctor.js';

import { CustomToastCloseButton } from '../components/CustomToast';
import CustomScrollbars from '../components/CustomScrollbars.js';
import VerifyEmail from './Patient/VerifyEmail.js';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty.js';
import DetailClinic from './Patient/Clinic/DetailClinic.js';
import DetailNews from './Patient/News/DetailNews.js';
import DetailNewsDoctor from './Patient/NewsForDoctor/DetailNewsDoctor.js';
import DetailContact from './System/Contact/DetailContact.js';

import DemoSearch from './Patient/Search/DemoSearch.js';
import MoreSpecialty from './Patient/Specialty/MoreSpecialty.js';
import MoreClinic from './Patient/Clinic/MoreClinic.js';
import MoreDoctor from './Patient/Doctor/MoreDoctor.js';
import MoreNews from './Patient/News/MoreNews.js';
import MoreNewsDoctor from './Patient/NewsForDoctor/MoreNewsDoctor.js';
import DetailReason from './Patient/Reason/DetailReason.js';



class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path='/doctor/' component={userIsAuthenticated(Doctor)} />

                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.DETAIL_NEWS} component={DetailNews} />
                                    <Route path={path.DETAIL_NEWSDOCTOR} component={DetailNewsDoctor} />
                                    <Route path={path.DETAIL_CONTACT} component={DetailContact} />
                                    <Route path={path.DETAIL_REASON} component={DetailReason} />

                                    <Route path={path.SEARCH} component={DemoSearch} />
                                    <Route path={path.MORE_SPECIALTY} component={MoreSpecialty} />
                                    <Route path={path.MORE_CLINIC} component={MoreClinic} />
                                    <Route path={path.MORE_DOCTOR} component={MoreDoctor} />
                                    <Route path={path.MORE_NEWS} component={MoreNews} />
                                    <Route path={path.MORE_NEWSDOCTOR} component={MoreNewsDoctor} />

                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position='top-right'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);