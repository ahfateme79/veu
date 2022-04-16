export const addFarmValidation = {
    methods: {
        validateFarmTitle(value) {
            if (value === '') {
                return 'عنوان مزرعه الزامی است'
            }
            return true
        },
    }
}