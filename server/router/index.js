const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')
const MultiGeocoder = require('multi-geocoder')


router.post('/registration',
    body('email').isEmail(),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
// router.get('/bids', authMiddleware, userController.getBids)
// router.get('/bids', userController.getBids)


module.exports = router
