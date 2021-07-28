const express = require('express');
const { createUser, loginUser, getUsers, updateUserInfo, getSingleUser, deleteUser } = require('../controllers/User')
const verifyToken = require('../middlewares/verifyToken')
const router = express();

//route create a user
router.post('/signup', createUser);

//route to login a user
router.post('/login', verifyToken, loginUser);

//route to get all user
router.get('/', getUsers)

//route to get user by id
router.get('/:id', getSingleUser)

//route to update a user using user id
router.put('/update/:id', verifyToken, updateUserInfo)

//router to delete user using user id
router.delete('/delete/:id', verifyToken, deleteUser)


module.exports = router;