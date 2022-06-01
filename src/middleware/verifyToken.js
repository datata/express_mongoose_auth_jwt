const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.json({
            success: false,
            message: 'No token provided'
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded.user);

        req.user = decoded;

        next();
    } catch (error) {
        return res.json({
            success: false,
            message: 'Token invalid'
        });
    }
}  

module.exports = auth;