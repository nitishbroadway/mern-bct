const { errorMsg } = require("../../library/functions")
const User = require("../../models/user.model")

class ProfileController {
    details = async (req, res, next) => {
        res.send(req.user)
    }

    update = async (req, res, next) => {
        try {
            const {name, phone, address} = req.body

            await User.findByIdAndUpdate(req.user._id, {name, phone, address})

            res.send({
                messsage: 'Profile updated!'
            })
        } catch(error) {
            errorMsg(error)
        }
    }
}

module.exports = new ProfileController