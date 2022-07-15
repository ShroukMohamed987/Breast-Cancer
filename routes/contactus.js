const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")

const {
    cotactus,getAll
  } = require('../controllers/contactCtrl')

  router.route('/contactus').post(cotactus).get(getAll)




module.exports=router