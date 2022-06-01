const express = require('express');
const router = express.Router()

const UserController = require('../controllers/UserController');
const authController = require('../controllers/authController');


router.get('/users', UserController.getAllUsers);

router.get('/user/:id', UserController.getUserById);

router.put('/user/:id', UserController.updateUserByid);

router.post('/user', authController.register);

router.delete('/user/:id', UserController.deleteUserByid);

router.post('/login', authController.login);

module.exports = router;