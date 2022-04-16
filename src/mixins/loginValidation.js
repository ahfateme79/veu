export const loginValidation = {
    methods: {
        validateCellphone(value) {
            if (value === '') {
                return 'شماره موبایل الزامی است';
            }
            // if the field is not a valid phone number
            // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            // if (!regex.test(value)) {
            //     return 'فیلد ایمیل باید فرمت درست داشته باشد';
            // }
            // All is good
            return true;
        },
        validateConfirmCode(value) {
            if (value === '' || value === null) {
                return 'وارد کردن کد الزامی است'
            } else if (value.length > 5 || value.length < 5) {
                return 'مقدار کد درست وارد نشده است'
            }
            return true
        },
        signUpّFirstNameValidation(value) {
            if (value === "") {
                return 'وارد کردن فیلد نام الزامی است'
            }
            return true
        },
        signUpLastNameValidation(value) {
            if (value === "") {
                return 'وارد کردن فیلد نام خانوادگی الزامی است'
            }
            return true
        },
        signUpStateValidation(value) {
            if (value === null) {
                return 'انتخاب استان الزامی است'
            }
            return true
        },
        signUpCityValidation(value) {
            if (value === null) {
                return 'انتخاب شهر الزامی است'
            }
            return true
        },
        profileNationalCode(value) {
            if (value === "") {
                return 'وارد کردن کد ملی الزامی است'
            }
            return true
        },
        profilePhoneNumber(value) {
            if (value === "") {
                return 'وارد کردن شماره تلفن همراه الزامی است'
            }
            return true
        },
        profileFirstName(value) {
            if (value === "") {
                return 'وارد کردن نام الزامی است'
            }
            return true
        },
        profileLastName(value) {
            if (value === "") {
                return 'وارد کردن نام خانوادگی الزامی است'
            }
            return true
        }

    }
}