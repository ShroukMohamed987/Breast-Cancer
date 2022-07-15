const express = require('express')

const router = express.Router()
const auth=require("../middleware/auth")

 const {
    getAllrays, addray,update_ray,delete_ray,get_ray
  } = require('../controllers/x_rays_controller')

router.route('/getrays').get(getAllrays)
router.route('/addrays').post(addray)
router.route('/update_ray/:id').put(update_ray)
router.route('/delete_ray/:id').delete(delete_ray)
router.route('/get_one_ray/:name').get(get_ray)


module.exports = router