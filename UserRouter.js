const express=require('express');
const router=express.Router();
const  userController=require('../Controller/UserController');

router.get('/getAllUser',userController.getAllUser);

router.post('/createUser',userController.createUser);


router.put('/updateUser',userController.updateUser);

router.delete('/deleteUser',userController.deleteUser)




module.exports=router;