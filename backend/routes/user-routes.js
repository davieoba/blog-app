const express = require('express')
const multer = require('multer')
const authController = require('./../controllers/auth-controller')
const userController = require('./../controllers/user-controller')
const router = express.Router()
const upload = multer({ dest: './../public/img/users' })

// auth controllers
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

router.route('/me').get(authController.protect, authController.getMe)
router.route('/activate/:id').get(authController.activate)

router.route('/forgotpassword').post(authController.forgotPassword)
router.route('/resetpassword/:id').post(authController.resetPassword)

// user controllers
router
  .route('/updateme')
  .patch(
    authController.protect,
    upload.single('photo'),
    userController.updateMe
  )
module.exports = router
