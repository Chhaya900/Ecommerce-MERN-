import express  from "express";
import {registerController ,
     loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController} from "../controller/authConstroller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//routes object
const router = express.Router();

//routing
//Register || Method post

router.post('/register',registerController)

//LOGIN || POST

router.post('/login',loginController)

//Forget Password
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test', requireSignIn ,isAdmin ,testController)

//Protected user route Auth
router.get('/user-auth' , requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
//Protected  Admin route Auth
router.get('/admin-auth' , requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});


//Update Profile
router.put('/profile' , requireSignIn , updateProfileController)


//Order
router.get('/orders',requireSignIn ,getOrdersController)

//All Orders Admin Panel
router.get('/all-orders',requireSignIn ,isAdmin,getAllOrdersController);

//Order Status Update
router.put('/order-status/:orderId' ,requireSignIn , isAdmin , orderStatusController)
export default router;