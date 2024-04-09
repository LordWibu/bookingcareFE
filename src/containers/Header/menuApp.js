export const doctorMenu = [
    { //quản lý kế hoạch khám bệnh của bác sĩ
        name: 'menu.doctor.manage-schedule',
        menus: [
            {

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            }
        ]
    },
    {
        name: 'menu.doctor.manage-patient',
        menus: [
            {

                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            }
        ]
    }
];

export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage'

            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'

            },

            { //quản lý kế hoạch khám bệnh của bác sĩ

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            }

        ]
    },
    {
        name: 'Bệnh nhân',
        menus: [
            {
                name: 'Quản lý bệnh nhân chưa xác nhận đặt lịch', link: '/system/manage-patient-not-confirm'
            }
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'

            },
        ]
    },

    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'

            },
        ]
    },

    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-news'

            },
        ]
    },

    { //quản lý liên hệ
        name: 'Liên hệ',
        menus: [
            {
                name: 'Quản lý liên hệ', link: '/system/manage-contact'

            },
        ]
    },
    {
        name: 'Lý do khám',
        menus: [
            {
                name: 'Quản lý lý do khám', link: '/system/manage-reason'
            }
        ]
    },

];