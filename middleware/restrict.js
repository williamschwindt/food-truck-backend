const jwt = require('jsonwebtoken')

function restrict() {
    const authErr = {
        message: 'invalid credentials'
    }
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if(!authorization) {
                return res.status(401).json(authErr)
            }

            jwt.verify(authorization, process.env.JWT_SECRET, (err, decodedPayload) => {
                if(err) {
                    return res.status(401).json(authErr)
                }

                req.token = decodedPayload
                next()
            })


        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict