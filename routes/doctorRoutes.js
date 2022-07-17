const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")

 const {
    registerDoctor,
    getAllDoctor,
    login,
    forgetPassword,
    resetPassword,
    
  } = require('../controllers/doctorCtrl')


router.route('/alldoctor').get(getAllDoctor)
router.route('/adddoctor').post(registerDoctor)
router.route('/logindoctor').post(login)
router.route('/forgetPassword').post(forgetPassword)
router.route('/resetpassword').post(resetPassword)








module.exports=router