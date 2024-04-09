import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })

    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let da = await handleLoginApi(this.state.username, this.state.password)
            if (da && da.data.errCode !== 0) {
                this.setState({
                    errMessage: da.data.message
                })
            }
            if (da && da.data.errCode === 0) {
                this.props.userLoginSuccess(da.data.user)
                console.log('Login Succeed!')
            }
            console.log(da)
        } catch (e) {
            this.setState({
                errMessage: e.response.data.message
            })
            console.log('Hoi dan it', e.response);
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handlekeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>

                        <div className='col-12 text-login'>
                            Login
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                                type='text'
                                className='form-control'
                                placeholder='Enter your username' />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    value={this.state.password}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    onKeyDown={(e) => this.handlekeyDown(e)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>

                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button onClick={() => this.handleLogin()} className='btn-login'>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
