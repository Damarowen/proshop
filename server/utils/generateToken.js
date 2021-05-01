import jwt from 'jsonwebtoken'

const generateToken = (user_id) => {

    const payload = {
        user_id: user_id
    }

    const option = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, process.env.JWT_SECRET, option)
}


export default generateToken;