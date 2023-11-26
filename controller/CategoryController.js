
import CatergoryModel from "../models/CatergoryModel.js";
import slugify from "slugify";

// import { CatergoryRoutes } from '/';

export const  CreateCategoryController = async(req , res)=>
{
try{
const {name} =req.body
if(!name)
{
    return res.status(401).send({
        message:'Name is Required',
    })
}
const existingCategory = await CatergoryModel.findOne({name})
if(existingCategory)
{
 return  res.status(200).send({
    success:false,
    message:'Category Already Exisits'
 })   
}
const category = await new CatergoryModel({
    name, 
    slug:slugify(name)}).save()
res.status(201).send({
    success:true,
    message:'new Category Created',
    category,
})

}
catch(error)
{
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:'Error in Category'
    })
}
};



//Update  Cayegory

export const UpdateCategoryController = async(req,res)=>
{
try{
const {name} =req.body;
const{id} =req.params
const category = await CatergoryModel.findByIdAndUpdate(
    id,
    {name,slug:slugify(name)},
    {new:true}
    );
res.status(200).send({
success:true,
message:'Category Updated Successfully',
category,
});
}
catch(error)
{
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error while Updating category '
    })
}
};
//get All category
 export const categoryController = async(req, res)=>
 {
    try{
       const Category =await CatergoryModel.find({});
       res.status(200).send({
        success:true,
        message:"All Category List",
        Category,
       });
    }
    catch(error)
    {
        console.log(error);
        res.status(501).send({
            success:false,
            error,
            message:"while getting all category"
        })
    }

 };

 //Single Category 

 export const singleCategoryController = async(req,res) =>
    {
      try{
         
            const category =await CatergoryModel.findOne({slug:req.params.slug})
            res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category
            })
            }
      catch(error)
      {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting  Single Category",
            error,
        })
      }
    };

    //Delete category
    export const deleteCategoryController = async(req,res)=>
    {
  try
  {
  const {id} =req.params;
  await CatergoryModel.findByIdAndDelete(id);
  res.status(200).send({
    success:true,
    message:"Category Deleted Successfully" ,
  });
  }
  catch(error)
  {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error while deleting category",
        error,

    })
  }
    }
