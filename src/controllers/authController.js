const mongoose = require('mongoose');;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({email});

        if(existUser) {
            return res.json({ 
                success:false,
                message: 'User email already exists',
                data: []
            });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password
        });

        user.password = encryptedPassword;

        const newUser = await user.save();

        return res.json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error creating user'
            }
        });
    }
};

module.exports = {
    register
};