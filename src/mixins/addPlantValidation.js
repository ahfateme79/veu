export const addPlantValidation = {
    methods: {
        validatePlantNumber(value) {
            if (value === null) {
                return 'انتخاب رقم گیاه الزامی است'
            }
            return true
        },
        validatePlantName(value) {
            if (value === null) {
                return 'انتخاب نام گیاه الزامی است'
            }
            return true
        },
        validatePlantType(value) {
            if (value === null) {
                return 'انتخاب نوع آبیاری الزامی است'
            }
            return true
        },
        validateDate(value) {
            if (value === null) {
                return 'انتخاب تاریخ کشت الزامی است'
            }
            return true
        }


    }
};
