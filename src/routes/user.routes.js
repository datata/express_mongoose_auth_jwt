const express = require('express');
const router = express.Router()

router.get('/users', (req, res) => {
    return res.send('Get all users')
});

router.get('/user', (req, res) => {
    return res.send('Get user')
});

router.put('/user/:id', (req, res) => {
    return res.send('Update user')
});

router.post('/user', (req, res) => {
    return res.send('Create user')
});

router.delete('/user/:id', (req, res) => {
    return res.send('Delete user')
});

module.exports = router;