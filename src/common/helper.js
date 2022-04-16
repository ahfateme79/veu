export default {
    getErrorMessage(error, self) {
        let toastMessage = '';
        if (error.response === undefined) {
            toastMessage = localStorage.getItem("system_language") === "fa" ?
                "خطای سرور !" :
                "Server Error !";
        } else {
            let status = error.response.status;
            if (status === 422) {
                let errorResponse = error.response.data.errors,
                    errors = [];
                Object.keys(errorResponse).map((key) =>
                    errors.push(errorResponse[key])
                );
                toastMessage = errors.join(",");
            } else if (status === 400) {
                toastMessage = error.response.data.message;
            } else if (status === 500) {
                toastMessage = localStorage.getItem("system_language") === "fa" ?
                    "خطای سرور !" :
                    "Server Error !";
            } else if (status === 401 || status === 403) {
                self.$router.push({ name: 'login' })
            } else if (status === 404) {
                self.$router.push({ name: 'Not-found' })

            }
        }

        return toastMessage
    },
    getObject(array, id) {
        let selectedObject = null
        array.map(item => {
            if (item.id == id) selectedObject = item
        })
        return selectedObject
    }

}

