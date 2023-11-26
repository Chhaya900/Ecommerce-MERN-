import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { 
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
   deleteProductController,
    getProductController,
     getSingleProductController, 
     productCategoryController, 
     productCountController,
      productFiltersController,
       productListController,
        productPhotoController, 
         realProductController, 
         searchProductController, 
         updateProductController } from "../controller/productController.js";
import Formidable from "express-formidable";

const router = express.Router()

//routes
router.post(
    "/create-product",
requireSignIn,
 isAdmin ,
 Formidable(),
  createProductController
  );

  //get Products
  router.get('/get-product' , getProductController)

  //single product
  router.get("/get-product/:slug" , getSingleProductController);

  //get photo
  router.get('/product-photo/:pid',productPhotoController)

  //delete Product
  router.delete("/delete-product/:pid" , deleteProductController)

  //update route
  router.put(
    '/update-product/:pid',
requireSignIn,
 isAdmin ,
 Formidable(),
  updateProductController
  );
  
//get photo
// router.get('/product-photo/:pid',productPhotoController)

//Filter Product
router.post('/product-filters',productFiltersController)

//Product Count
router.get('/product-count' , productCountController);

//Product per page
router.get('/product-list/:page',productListController)

//search product router
router.get('/search/:keyword', searchProductController);

//Similar Product
router.get('related-product/:pid/:cid',realProductController);

//category wise product
router.get('/product-category/:slug',productCategoryController);

//payment routes
//token
router.get('/braintree/token' , braintreeTokenController)

//payment
router.post('braintree/payment',requireSignIn,brainTreePaymentController)
export  default router;