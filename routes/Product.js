const express = require('express');
const { createUser, loginUser, getUsers } = require('../controllers/User')
const verifyToken = require('../middlewares/verifyToken')
const router = express();

router.post('/signup', createUser);
router.post('/login', verifyToken, loginUser);
router.get('/', getUsers)



module.exports = router;