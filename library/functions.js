const validationMsg = (next, validation) => {
    next({
        message: 'Some data are invalid!',
        validation,
        status: 422,
    })
}

const errorMsg = (error, next) => {
    console.log(error)

    if ('errors' in error) {
        let validation = {}

        for (let k in error.errors) {
            validation = {
                ...validation,
                [k]: error.errors[k].message
            }
        }

        validationMsg(next, validation)
    } else if ('code' in error && error.code == 11000) {
        validationMsg(next, {
            email: 'Given email is already registered!'
        })
    } else {
        next({
            message: 'Something went wrong!',
            status: 400
        })
    }
}

module.exports = {errorMsg, validationMsg}