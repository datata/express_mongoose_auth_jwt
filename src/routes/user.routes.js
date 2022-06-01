const express = require('express');
const router = express.Router()

const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAllUsers);

router.get('/user/:id', UserController.getUserById);

router.put('/user/:id', UserController.updateUserByid);

router.post('/user', UserController.createUser);

router.delete('/user/:id', UserController.deleteUserByid);

module.exports = router;