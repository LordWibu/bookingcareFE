const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',



    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',

    FETCH_TOP_DOCTORS_SUCCESS: 'FETCH_TOP_DOCTORS_SUCCESS',
    FETCH_TOP_DOCTORS_FAILED: 'FETCH_TOP_DOCTORS_FAILED',

    FETCH_ALL_DOCTORS_SUCCESS: 'FETCH_ALL_DOCTORS_SUCCESS',
    FETCH_ALL_DOCTORS_FAILED: 'FETCH_ALL_DOCTORS_FAILED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAILED: 'FETCH_ALLCODE_SCHEDULE_TIME_FAILED',

    FETCH_REQUIRED_DOCTOR_INFO_START: 'FETCH_REQUIRED_DOCTOR_INFO_START',
    FETCH_REQUIRED_DOCTOR_INFO_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFO_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFO_FAILED: 'FETCH_REQUIRED_DOCTOR_INFO_FAILED',

    FETCH_ALL_SPECIALTIES_SUCCESS: 'FETCH_ALL_SPECIALTIES_SUCCESS',
    FETCH_ALL_SPECIALTIES_FAILED: 'FETCH_ALL_SPECIALTIES_FAILED',

    EDIT_SPECIALTY_SUCCESS: 'EDIT_SPECIALTY_SUCCESS',
    EDIT_SPECIALTY_FAILED: 'EDIT_SPECIALTY_FAILED',

    DELETE_SPECIALTY_SUCCESS: 'DELETE_SPECIALTY_SUCCESS',
    DELETE_SPECIALTY_FAILED: 'DELETE_SPECIALTY_FAILED',

    FETCH_ALL_CLINIC_SUCCESS: 'FETCH_ALL_CLINIC_SUCCESS',
    FETCH_ALL_CLINIC_FAILED: 'FETCH_ALL_CLINIC_FAILED',

    EDIT_CLINIC_SUCCESS: 'EDIT_CLINIC_SUCCESS',
    EDIT_CLINIC_FAILED: 'EDIT_CLINIC_FAILED',

    DELETE_CLINIC_SUCCESS: 'DELETE_CLINIC_SUCCESS',
    DELETE_CLINIC_FAILED: 'DELETE_CLINIC_FAILED',

    FETCH_ALL_NEWS_SUCCESS: 'FETCH_ALL_NEWS_SUCCESS',
    FETCH_ALL_NEWS_FAILED: 'FETCH_ALL_NEWS_FAILED',

    EDIT_NEWS_SUCCESS: 'EDIT_NEWS_SUCCESS',
    EDIT_NEWS_FAILED: 'EDIT_NEWS_FAILED',

    DELETE_NEWS_SUCCESS: 'DELETE_NEWS_SUCCESS',
    DELETE_NEWS_FAILED: 'DELETE_NEWS_FAILED',

    FETCH_ALL_NEWSDOCTOR_SUCCESS: 'FETCH_ALL_NEWSDOCTOR_SUCCESS',
    FETCH_ALL_NEWSDOCTOR_FAILED: 'FETCH_ALL_NEWSDOCTOR_FAILED',

    EDIT_NEWSDOCTOR_SUCCESS: 'EDIT_NEWSDOCTOR_SUCCESS',
    EDIT_NEWSDOCTOR_FAILED: 'EDIT_NEWSDOCTOR_FAILED',

    DELETE_NEWSDOCTOR_SUCCESS: 'DELETE_NEWSDOCTOR_SUCCESS',
    DELETE_NEWSDOCTOR_FAILED: 'DELETE_NEWSDOCTOR_FAILED',

    DELETE_BOOKING_SUCCESS: 'DELETE_BOOKING_SUCCESS',
    DELETE_BOOKING_FAILED: 'DELETE_BOOKING_FAILED',

    EDIT_REASON_SUCCESS: 'EDIT_REASON_SUCCESS',
    EDIT_REASON_FAILED: 'EDIT_REASON_FAILED',
})

export default actionTypes;