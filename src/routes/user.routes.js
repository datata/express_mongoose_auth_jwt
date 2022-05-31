const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()

const UserController = require('../controllers/UserController');

const User = require('../models/User');

router.get('/users', UserController.getAllUsers);

router.get('/user/:id', UserController.getUserById);

router.put('/user/:id', UserController.updateUserByid);

router.post('/user', UserController.createUser);

router.delete('/user/:id', UserController.deleteUserByid);

module.exports = router;