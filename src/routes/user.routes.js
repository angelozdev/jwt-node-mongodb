const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../controllers/auth.controller')
const { signup, showUsers, showMe, login } = require('../controllers/user.controller')

/* Register */
router.post('/signup', signup)

/* login */
router.post('/login', login)

router.get('/users', verifyToken, showUsers)

router.get('/me', verifyToken, showMe)


module.exports = router;