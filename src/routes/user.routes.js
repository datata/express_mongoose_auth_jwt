const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()

const User = require('../models/User');

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({},['-_password']);
        
        return res.json({ 
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (err) {
        return res.json({ 
            success: false, 
            message: {
                error: 'Error retrieving user' 
            }
        });
    }
});

router.get('/user/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const isMongooseObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isMongooseObjectId) {
            return res.json({ succes:true, data: [], message: 'Invalid id'  });
        }

        const user = await User.findById(id).select(['-password']);

        if(!user) {
            return res.json({  success: true, data: [], message: 'User not found'  });
        }

        return res.json({ 
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        return res.json({ 
            success: false,
            message: {
                error: 'Error retrieving user'
            }
        });
    }

});

router.put('/user/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const isMongooseObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isMongooseObjectId) {
            return res.json({ succes:true, data: [], message: 'Invalid id' });
        }

        const userDelete = await User.findById(id);

        if(!userDelete) {
            return res.json({ success: true, data: [], message: 'User not found' });
        }
        
        const { name, password } = req.body;

        const userData = {
            name,
            password
        };

        const user = await User.findByIdAndUpdate(id, userData, { new: true }).select(['-password'])

        return res.json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error updating user'
            }
        });
    }
});

router.post('/user', async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        return res.json({
            success: true,
            message: 'User created',
            data: user 
        });  
    } catch (error) {
        return res.json({ 
            success:false, 
            message: {
                error: 'Error creating user'
            }
        });
    }
});

router.delete('/user/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const isMongooseObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isMongooseObjectId) {
            return res.json({ success:true, data: [], message: 'Invalid id' });
        }

        const userDelete = await User.findById(id);

        if(!userDelete) {
            return res.json({ success:true, data: [], message: 'User not found' });
        }

        userDelete.remove();
    
        return res.json(
            {
                success: true,
                message: 'User with id: ' + id + ' deleted',
                data: []
            }
        )
    } catch (error) {
        return res.json({ 
            success: false,
            message: {
                error: 'Error deleting user' 
            }
        });
    }
});

module.exports = router;