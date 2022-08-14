import express from "express";
import { FakeData } from "../FakeData.js";
import { DropdownData } from "../models/dropdownModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";


const seedRouter = express.Router()

seedRouter.get('/',async(req, res)=>{
    // await Product.deleteMany({})
    // const createdProducts = await Product.insertMany(FakeData.products)
    
    // await User.deleteMany({})
    // const createdUsers = await User.insertMany(FakeData.users)
    // res.send({createdProducts, createdUsers})

    // await DropdownData.deleteMany({})
    // const createdData = await DropdownData.insertMany({fields:FakeData.DropdownData})
    // res.send({...createdData})


    await User.deleteMany({})
    const createdData = await User.insertMany(FakeData.User)
    res.send({...createdData})


})

export default seedRouter