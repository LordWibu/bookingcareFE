import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>

                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="90%"
                            height="400px"
                            src="https://www.youtube.com/embed/7tiR7SI4CkI"
                            title="BookingCare trên VTV1 ngày 21/02/2018 - Chương trình Cà phê khởi nghiệp"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>

                        </iframe>
                    </div>

                    <div className='content-right'>
                        <p>
                            Nền tảng Y tế chăm sóc sức khoẻ toàn diện kết nối người dùng đến với Bác sĩ, cơ sở và dịch vụ y tế uy tín tin cậy hàng đầu Việt Nam.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
