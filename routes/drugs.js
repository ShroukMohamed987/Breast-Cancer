const express = require('express')

const router = express.Router()

 const {
    add_drug,get_drugs,update_drug,delete_drug
  } = require('../controllers/drugs_controller')


router.route('/add_drug').post(add_drug)
router.route('/get_drug/:name').get(get_drugs)
router.route('/update_drug/:id').put(update_drug)
router.route('/delete_drug/:id').delete(delete_drug)
module.exports = router