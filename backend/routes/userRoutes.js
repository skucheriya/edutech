import express from 'express'
import { User } from '../models/userModel'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils'
import expressAsyncHandler from 'express-async-handler'
const userRouter = express()

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({username:req.body.username})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({...user._doc,token: generateToken(user)})
            return
        }
    }
    res.status(401).send({message: 'Invalid username or password'})
}))

userRouter.post('/signup',expressAsyncHandler(async(req,res)=>{
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,12)
    })
    const user = await newUser.save()
    res.send({...user._doc,token: generateToken(user)})
}))


userRouter.post('/mentorList',expressAsyncHandler(async(req,res)=>{
    console.log("params",req)
    const {sector,stream,subStream}=req.body
    const user = await User.find({role:"mentor",sector,stream,subStream})
    // console.log(user)
    res.send(user)
}))

userRouter.post('/profile',expressAsyncHandler(async(req,res)=>{
        const newUser = new User({
            dob: req.body.dob,
            educationDesc: req.body.educationDesc,
            email: req.body.email,
            name: req.body.name,
            number: req.body.number,
            picture: req.body.picture,
            token: req.body.token,
        })
        const user = await newUser.save()
        res.send({...user._doc})
}))


userRouter.get('/:email',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.email)
    const user = await User.findOne({email:req.params.email})
    res.send(user?{...user._doc}:null)
}))

export default userRouter