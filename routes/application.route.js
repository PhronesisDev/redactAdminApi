const express = require('express')
const admin_controller = require('../controller/admin.controller')
const route = express.Router()

route.get('/ping',admin_controller.ping)
route.get('/viewAdminList', admin_controller.viewAdminList) 
route.get('/addAdminList/login',admin_controller.loginAdmin)
route.get('/AdminList/getLogin/:ID',admin_controller.LoginAdminID)
/////// super user functions//////////////
route.post('/SuperUser/addAdminList',admin_controller.AddAdmin)
route.delete('/SuperUser/deleteAdminList',admin_controller.DeleteAdmin)
route.put('/SuperUser/updateAdminList',admin_controller.updateAdmin)
module.exports.ad_route = route























