const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/welcome', userController.welcome);
router.post('/addUser', userController.createUser);
router.get('/list', userController.getUserList);
// router.get('/:id', [isAuthorized], userController.getUser);
router.delete('/delete', userController.deleteUser);
router.put('/update', userController.updateUserDetails);

module.exports = router;