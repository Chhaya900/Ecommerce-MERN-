
import  express from "express"
import { isAdmin, requireSignIn } from './../middlewares/authMiddlewares.js';
import { CreateCategoryController, 
         UpdateCategoryController,
         deleteCategoryController,
          categoryController,
          singleCategoryController } from "../controller/CategoryController.js";



const router = express.Router()
//Routes
//Create Category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    CreateCategoryController
    );

    //Update category
    router.put(
        '/update-category/:id', 
        requireSignIn,
        isAdmin, 
       UpdateCategoryController
       );

       //getAll Category
       router.get('/get-category',categoryController);

       //Single Category
       router.get('/single-category/:slug' , singleCategoryController)

       //Delete Category
       router.delete(
        '/delete-category/:id', 
        requireSignIn,
         isAdmin,
          deleteCategoryController);
export default router;
