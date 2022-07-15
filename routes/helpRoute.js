const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")

const {
    help,getAll
  } = require('../controllers/helpCtrl')


  router.route('/help').post(help).get(getAll)




module.exports=router