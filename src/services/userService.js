import axios from 'axios';
const http = axios.create({ baseURL: 'http://localhost:8080' })

const handleLoginApi = (email, password) => {
    return http.post(`/api/login`, { email, password });
}
const getAllUsers = (inputId) => {
    return http.get(`/api/get-all-users?id=${inputId}`);
}
const createNewUserService = (data) => {
    return http.post(`/api/create-new-user`, data);
}
const deleteUserService = (userId) => {
    return http.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    });
}
const editUserService = (inputData) => {
    return http.put(`/api/edit-user`, inputData);
}
const getAllCodeService = (inputType) => {
    return http.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return http.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorService = (config) => {
    return http.get(`/api/get-all-doctor`, config)
}

const saveDetailDoctorService = (data) => {
    return http.post(`/api/save-info-doctor`, data);
}

const getDetailInfoDoctor = (id) => {
    return http.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return http.post(`/api/bulk-create-schedule`, data);
}

const getScheduleByDate = (doctorId, date) => {
    return http.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInfoDoctorById = (doctorId) => {
    return http.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return http.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBookAppointment = (data) => {
    return http.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointment = (data) => {
    return http.post(`/api/verify-book-appointment`, data);
}

const postConfirmBookAppointment = (data) => {
    return http.post(`/api/confirm-book-appointment`, data);
}

const createNewSpecialty = (data) => {
    return http.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = (config) => {
    return http.get(`/api/get-all-specialty`, config);
}

const updateSpecialty = (data) => {
    return http.put(`/api/update-specialty`, data);
}

const deleteSpecialty = (specialtyId) => {
    return http.delete(`/api/delete-specialty`, {
        data: {
            id: specialtyId
        }
    });
}

const getDetailSpecialtyById = (data) => {
    return http.get(`/api/get-detail-specialty-by-id?id=${data.specialtyId}&location=${data.location}`);
}

const createNewClinic = (data) => {
    return http.post(`/api/create-new-clinic`, data);
}

const getAllClinic = (config) => {
    return http.get(`/api/get-all-clinic`, config);
}

const getDetailClinicById = (data) => {
    return http.get(`/api/get-detail-clinic-by-id?id=${data.clinicId}`);
}

const getAllPatientForDoctor1 = (data) => {
    return http.get(`/api/get-list-patient-for-doctor-1?doctorId=${data.doctorId}&date=${data.date}`);
}

const getAllPatientForDoctor2 = (data) => {
    return http.get(`/api/get-list-patient-for-doctor-2?date=${data.date}`);
}

const postSendRemedy = (data) => {
    return http.post(`/api/send-remedy`, data);
}

const updateClinic = (data) => {
    return http.put(`/api/update-clinic`, data);
}

const deleteClinic = (clinicId) => {
    return http.delete(`/api/delete-clinic`, {
        data: {
            id: clinicId
        }
    });
}

const createNews = (data) => {
    return http.post(`/api/create-news`, data);
}

const getAllNews = (config) => {
    return http.get(`/api/get-all-news`, config);
}

const updateNews = (data) => {
    return http.put(`/api/update-news`, data);
}

const deleteNews = (newsId) => {
    return http.delete(`/api/delete-news`, {
        data: {
            id: newsId
        }
    });
}

const getDetailNewsById = (data) => {
    return http.get(`/api/get-detail-news-by-id?id=${data.newsId}`);
}

const createNewsDoctor = (data) => {
    return http.post(`/api/create-newsfordoctor`, data);
}

const getAllNewsDoctor = (config) => {
    return http.get(`/api/get-all-newsfordoctor`, config);
}

const updateNewsDoctor = (data) => {
    return http.put(`/api/update-newsfordoctor`, data);
}

const deleteNewsDoctor = (newsId) => {
    return http.delete(`/api/delete-newsfordoctor`, {
        data: {
            id: newsId
        }
    });
}

const getDetailNewsDoctorById = (data) => {
    return http.get(`/api/get-detail-newsfordoctor-by-id?id=${data.newsId}`);
}

const createContact = (data) => {
    return http.post(`/api/create-contact`, data);
}

const getAllContact = () => {
    return http.get(`/api/get-all-contact`);
}

const getDetailContactById = (data) => {
    return http.get(`/api/get-detail-contact-by-id?id=${data.contactId}`);
}

const sendMailFeedback = (data, id) => {
    return http.put(`/api/send-feedback/${id}`, data);
}

const getAllBooking = () => {
    return http.get('/api/get-all-booking');
}

const deleteBooking = (bookingId) => {
    return http.delete(`/api/delete-booking`, {
        data: {
            id: bookingId
        }
    })
}

const createNewReason = (data) => {
    return http.post(`/api/create-new-reason`, data);
}

const getAllReason = (config) => {
    return http.get(`/api/get-all-reason`, config);
}

const updateReason = (data) => {
    return http.put(`/api/update-reason`, data);
}

const deleteReason = (reasonId) => {
    return http.delete(`/api/delete-reason`, {
        data: {
            id: reasonId
        }
    });
}

const getDetailReasonById = (data) => {
    return http.get(`/api/get-detail-reason-by-id?id=${data.reasonId}`);
}

export {
    createNewReason,
    getAllReason,
    updateReason,
    deleteReason,
    getDetailReasonById,
    postConfirmBookAppointment,
    deleteBooking,
    getAllBooking,
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    updateSpecialty,
    deleteSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    getAllPatientForDoctor1,
    getAllPatientForDoctor2,
    postSendRemedy,
    updateClinic,
    deleteClinic,
    createNews,
    getAllNews,
    getDetailNewsById,
    updateNews,
    deleteNews,
    createNewsDoctor,
    getAllNewsDoctor,
    getDetailNewsDoctorById,
    updateNewsDoctor,
    deleteNewsDoctor,
    createContact,
    getAllContact,
    getDetailContactById,
    sendMailFeedback

};
// , { email: email, password: password }