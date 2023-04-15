const admin_model = require('../models/admin.model')
const adminLOG_model = require('../models/adminLOGIN.model')
//////// validate if the API is working////
function ping(req,res){

    try {
        res.json({
            status: "API is running fine",
           //////code 200 stands for [ok]
            code: 200,
            data: null
        })
} catch (error) {
    console.log(error)
}}

///////////admin viewer////////////////////////
function viewAdminList(req, res) {
    res.json({
        status: "success",
        code: 200
    })
}


function LoginAdmin(req, res) {
    res.json({
        status: "success",
        code: 200
        
    })

}

function LoginAdminID(req, res) {
    const uniqueID = parseInt(req.params.ID);
    const findValue = adminLOG_model.Adminlogin.find(item => item.uniqueID === uniqueID);
   
        res.json({
            status: "",
            code: 200,
            data:findValue
        })
    
}

function AddAdmin(req,res) {
    const min = 6000;
    const max = 6666;
    ////generate a unique number for each user //////
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min
    ////////check if the unique ID exists in the database////
    const findValue = adminLOG_model.Adminlogin.find(item => item.uniqueID === randomInt);

    const newValue = {
    adminName : req.body.adminName,
    adminSurname :req.body.adminSurname,
    uniqueID:randomInt
    }

    
    if(findValue){
        res.json({
            status: "user exists",
            code: 200,
            data:findValue
            
        })
    }else{
    adminLOG_model.Adminlogin.push(newValue)
    res.json({
        status: "user Added",
        code: 200,
        data:adminLOG_model.Adminlogin
    })
}}


function DeleteAdmin(req,res){
    const uniqueID = parseInt(req.params.ID);
    const findValue = adminLOG_model.Adminlogin.find(item => item.uniqueID === uniqueID);

res.json({
    status: " user deleted",
    code: 200
  })
}

function updateAdmin(req,res){
    
const getID = req.params.getID
const findValue  = adminLOG_model.find(obj => obj.id === getID)

res.json({
    status: " user updated",
    code: 200
  })
}

module.exports.ping = ping
module.exports.viewAdminList = viewAdminList
module.exports.DeleteAdmin = DeleteAdmin
module.exports.updateAdmin = updateAdmin
module.exports.LoginAdminID = LoginAdminID
module.exports.AddAdmin = AddAdmin
module.exports.loginAdmin = LoginAdmin