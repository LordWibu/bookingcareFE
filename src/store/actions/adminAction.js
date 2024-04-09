import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorService, saveDetailDoctorService, getAllSpecialty,
    updateSpecialty, deleteSpecialty, getAllClinic, updateClinic,
    deleteClinic, getAllNews, updateNews, deleteNews,
    getAllNewsDoctor, updateNewsDoctor, deleteNewsDoctor, updateReason,

} from '../../services/userService';
import { toast } from 'react-toastify';
import { update } from 'lodash';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService('GENDER');
            if (res && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }

        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderFaild error: ', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.data.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }

        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFaild error: ', e);
        }
    }
}

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }

        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFaild error: ', e);
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.data.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create a new user error!");
                dispatch(saveUserFailed());
            }

        } catch (e) {
            toast.error("Create a new user error!");
            dispatch(saveUserFailed());
            console.log('fetchRoleFaild error: ', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All');
            if (res && res.data.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.data.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }

        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFaild error: ', e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: ' FETCH_ALL_USERS_FAILED',
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.data.errCode === 0) {
                toast.success("Delete user succeed!");
                dispatch(deleteUsersSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete user error!')
                dispatch(deleteUsersFailed());
            }

        } catch (e) {
            toast.error('Delete user error!')
            dispatch(deleteUsersFailed());
            console.log('DeleteUserFaild error: ', e);
        }
    }
}

export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS

})

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.data.errCode === 0) {
                toast.success("Update user succeed!");
                dispatch(editUsersSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update user error!')
                dispatch(editUsersFailed());
            }

        } catch (e) {
            toast.error('Edit user error!')
            dispatch(editUsersFailed());
            console.log('EditUserFaild error: ', e);
        }
    }
}

export const editUsersSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS

})

export const editUsersFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// let resdoc = await getTopDoctorHomeService(4);

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH DOCTORS FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoc: res.data.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH ALL DOCTORS FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDetailInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.data.errCode === 0) {
                toast.success("Save info detail doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDoc: res.data.data
                })
            } else {
                toast.error("Save info detail doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save info detail doctor error!");
            console.log("SAVE_DETAIL_DOCTOR FAILED: ", e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getRequiredDoctorInfo = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START
            })

            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            console.log("Check resClinic: ", resClinic)

            if (resPrice && resPrice.data.errCode === 0
                && resPayment && resPayment.data.errCode === 0
                && resProvince && resProvince.data.errCode === 0
                && resSpecialty && resSpecialty.data.errCode === 0
                && resClinic && resClinic.data.errCode === 0) {
                let data = {
                    resPrice: resPrice.data.data,
                    resPayment: resPayment.data.data,
                    resProvince: resProvince.data.data,
                    resSpecialty: resSpecialty.data.specialties,
                    resClinic: resClinic.data.clinics
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data));

            } else {
                dispatch(fetchRequiredDoctorInfoFailed());
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log('fetchRequiredDoctorInfoFailed error: ', e);
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})

export const fetchAllSpecialties = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
                    dataSpecialties: res.data.specialties
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH ALL SPECIALTIES FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
            })
        }
    }
}

export const deleteASpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialty(specialtyId);
            console.log("Check res delete specialty", res.data)
            if (res && res.data.errCode === 0) {
                toast.success("Delete Specialty succeed!");
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialties());
            } else {
                toast.error('Delete Specialty error!')
                dispatch(deleteSpecialtyFailed());
            }

        } catch (e) {
            toast.error('Delete Specialty error!')
            dispatch(deleteSpecialtyFailed());
            console.log('DeleteSpecialtyFaild error: ', e);
        }
    }
}

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS

})

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED
})

export const editSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateSpecialty(data);
            if (res && res.data.errCode === 0) {
                toast.success("edit specialty succeed!");
                dispatch(editSpecialtySuccess());
                dispatch(fetchAllSpecialties());
            } else {
                toast.error('edit specialty error!')
                dispatch(editSpecialtyFailed());
            }

        } catch (e) {
            toast.error('Edit specialty error!')
            dispatch(editUsersFailed());
            console.log('editSpecialtyFailed error: ', e);
        }
    }
}

export const editSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS

})

export const editSpecialtyFailed = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED
})

export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
                    dataClinic: res.data.clinics
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINIC_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH ALL CLINIC FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_CLINIC_FAILED,
            })
        }
    }
}

export const deleteAClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinic(clinicId);
            if (res && res.data.errCode === 0) {
                toast.success("Delete Clinic succeed!");
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinic());
            } else {
                toast.error('Delete Specialty error!')
                dispatch(deleteClinicFailed());
            }

        } catch (e) {
            toast.error('Delete Clinic error!')
            dispatch(deleteClinicFailed());
            console.log('DeleteClinicFaild error: ', e);
        }
    }
}

export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS

})

export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED
})

export const editClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateClinic(data);
            if (res && res.data.errCode === 0) {
                toast.success("Edit clinic succeed!");
                dispatch(editClinicSuccess());
                dispatch(fetchAllClinic());
            } else {
                toast.error('edit clinic error!')
                dispatch(editClinicFailed());
            }

        } catch (e) {
            toast.error('Edit clinic error!')
            dispatch(editClinicFailed());
            console.log('editClinicFailed error: ', e);
        }
    }
}

export const editClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS

})

export const editClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED
})

export const fetchAllNews = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllNews();
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWS_SUCCESS,
                    dataNews: res.data.news
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWS_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH ALL NEWS FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_NEWS_FAILED,
            })
        }
    }
}

export const deleteANews = (newsId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteNews(newsId);
            if (res && res.data.errCode === 0) {
                toast.success("Delete News succeed!");
                dispatch(deleteNewsSuccess());
                dispatch(fetchAllNews());
            } else {
                toast.error('Delete News error!')
                dispatch(deleteNewsFailed());
            }

        } catch (e) {
            toast.error('Delete News error!')
            dispatch(deleteNewsFailed());
            console.log('deleteNewsFailed error: ', e);
        }
    }
}

export const deleteNewsSuccess = () => ({
    type: actionTypes.DELETE_NEWS_SUCCESS

})

export const deleteNewsFailed = () => ({
    type: actionTypes.DELETE_NEWS_FAILED
})

export const editNews = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateNews(data);
            if (res && res.data.errCode === 0) {
                toast.success("Edit news succeed!");
                dispatch(editNewsSuccess());
                dispatch(fetchAllNews());
            } else {
                toast.error('Edit news error!')
                dispatch(editNewsFailed());
            }

        } catch (e) {
            toast.error('Edit news error!')
            dispatch(editNewsFailed());
            console.log('editNewsFailed error: ', e);
        }
    }
}

export const editNewsSuccess = () => ({
    type: actionTypes.EDIT_NEWS_SUCCESS

})

export const editNewsFailed = () => ({
    type: actionTypes.EDIT_NEWS_FAILED
})

export const fetchAllNewsDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllNewsDoctor();
            console.log("Check res get all doctor", res)
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWSDOCTOR_SUCCESS,
                    dataNewsDoctor: res.data.newsDoctor
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWSDOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log("FETCH ALL NEWS DOCTOR FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_NEWSDOCTOR_FAILED,
            })
        }
    }
}

export const deleteANewsDoctor = (newsId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteNewsDoctor(newsId);
            if (res && res.data.errCode === 0) {
                toast.success("Delete News Doctor succeed!");
                dispatch(deleteNewsDoctorSuccess());
                dispatch(fetchAllNewsDoctor());
            } else {
                toast.error('Delete News Doctor error!')
                dispatch(deleteNewsDoctorFailed());
            }

        } catch (e) {
            toast.error('Delete News Doctor error!')
            dispatch(deleteNewsDoctorFailed());
            console.log('deleteNewsDoctorFailed error: ', e);
        }
    }
}

export const deleteNewsDoctorSuccess = () => ({
    type: actionTypes.DELETE_NEWSDOCTOR_SUCCESS

})

export const deleteNewsDoctorFailed = () => ({
    type: actionTypes.DELETE_NEWSDOCTOR_FAILED
})

export const editNewsDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateNewsDoctor(data);
            if (res && res.data.errCode === 0) {
                toast.success("Edit news doctor succeed!");
                dispatch(editNewsDoctorSuccess());
                dispatch(fetchAllNewsDoctor());
            } else {
                toast.error('Edit news doctor error!')
                dispatch(editNewsDoctorFailed());
            }

        } catch (e) {
            toast.error('Edit news doctor error!')
            dispatch(editNewsDoctorFailed());
            console.log('editNewsDoctorFailed error: ', e);
        }
    }
}

export const editNewsDoctorSuccess = () => ({
    type: actionTypes.EDIT_NEWSDOCTOR_SUCCESS

})

export const editNewsDoctorFailed = () => ({
    type: actionTypes.EDIT_NEWSDOCTOR_FAILED
})

export const deleteBooking = async (bookingId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBooking(bookingId);
            console.log(">>Check res", res)
            if (res && res.data.errCode === 0) {
                toast.success("Delete Booking succeed!");
                dispatch(deleteBookingSuccess());
            } else {
                toast.error('Delete Booking error!')
                dispatch(deleteBookingFailed());
            }

        } catch (e) {
            toast.error('Delete Booking error!')
            dispatch(deleteBookingFailed());
            console.log('deleteBookingFailed error: ', e);
        }
    }
}

export const deleteBookingSuccess = () => ({
    type: actionTypes.DELETE_BOOKING_SUCCESS

})

export const deleteBookingFailed = () => ({
    type: actionTypes.DELETE_BOOKING_FAILED
})

export const editReason = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateReason(data);
            if (res && res.data.errCode === 0) {
                toast.success("Edit reason succeed!");
                dispatch(editReasonSuccess());
            } else {
                toast.error('Edit Reason error!')
                dispatch(editReasonFailed());
            }

        } catch (e) {
            toast.error('Edit reason error!')
            dispatch(editReasonFailed());
            console.log('editReasonFailed error: ', e);
        }
    }
}

export const editReasonSuccess = () => ({
    type: actionTypes.EDIT_REASON_SUCCESS

})

export const editReasonFailed = () => ({
    type: actionTypes.EDIT_REASON_FAILED
})

