const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")
 const {
  registerPatient,
  getAllPateient,
    login,forgetPassword,resetPassword
  } = require('../controllers/patient_controller')

router.route('/addPatient').post(registerPatient)
router.route('/patientLogin').post(login )
router.route('/allpatient').get(getAllPateient )

router.route('/forgetpass').post(forgetPassword )
router.route('/resetpass').post(resetPassword )


module.exports = router