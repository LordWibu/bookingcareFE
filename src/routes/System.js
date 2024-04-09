import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageNews from '../containers/System/News/ManageNews';
import ManageContact from '../containers/System/Contact/ManageContact';
import ManagePatientNotConfirm from '../containers/System/Patient/ManagePatientNotConfirm';
import ManageReason from '../containers/System/Reason/ManageReason';

import { ConnectedRouter as Router } from 'connected-react-router';

class System extends Component {
    render() {
        // 
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {/* <Router> */}
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route path="/system/manage-news" component={ManageNews} />
                            <Route path="/system/manage-contact" component={ManageContact} />
                            <Route path="/system/manage-patient-not-confirm" component={ManagePatientNotConfirm} />
                            <Route path="/system/manage-reason" component={ManageReason} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
                {/* </Router> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
