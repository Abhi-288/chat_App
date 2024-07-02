const express=require('express')
const registerUser=require('../Controller/registerUser')
const checkEmail = require('../Controller/checkEmail')
const checkPassword = require('../Controller/checkPassword')
const userDetail = require('../Controller/userDetail')
const logout = require('../Controller/logout')
const updateUserDetail = require('../Controller/updateUserDetail')
const searchUser = require('../Controller/searchUser')

const router=express.Router()

// create user api
router.post('/register',registerUser)
// check user email
router.post('/email',checkEmail)
// check user password
router.post('/password',checkPassword)
//login user details
router.get('/user-detail',userDetail)
// logout user
router.get('/logout',logout)
// update user detail
router.post('/update-user',updateUserDetail)
//search user
router.post("/search-user",searchUser)

module.exports=router