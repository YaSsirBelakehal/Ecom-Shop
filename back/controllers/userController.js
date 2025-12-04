import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser = async(req,res)=>{
    const {email , password} = req.body

    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false , message:"User doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.json({success:false , message:"Invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true , token})

    }catch(err){
        console.log(err)
        res.json({success:false , message:"Error"})
    }
}


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Please enter a valid email"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(err){
        console.log(err)
        res.json({success:false , message:"Error"})
    }
}

export const getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.find().select("-password")
        res.json({success:true, data:users})
    }catch(err){
        console.log(err)
        res.json({success:false , message:"Error"})
    }
    
}

export const deleteUser = async(req,res)=>{
    try{
        const {id} = req.params
        const deletedUser = await userModel.findByIdAndDelete(id)
        if(!deletedUser){
            return res.status(404).json({success:false, message:"User not exist"})
        }
        res.json({success:true, message:"The user has been deleted successfully"})
    }catch(error){
        console.error("Error in deleting the user:",error)
        res.status(500).json({success:false , message:"Server error"})
    }
}

export const makeAdmin = async(req,res)=>{
    try{
        const {id} = req.params
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {role:"admin"},
            {new:true}
        )
        if(!updatedUser){
            return res.status(404).json({success:false, message:"User not exist"})
        }
        res.json({success:true, message:"The user has been promoted to Admin", data: updatedUser})
    }catch(error){
        console.error("Error in promoting the user:",error)
        res.status(500).json({success:false , message:"Server error"})
    }
}

export const demoteToUser = async (req,res)=>{
    try{
        const {id} = req.params

        const user = await userModel.findById(id)
        if(!user) return res.status(404).json({success: false, message:"User not found"})

        if(user.role !== "admin"){
            return res.status(400).json({success:false, message:"The user is not Admin"})
        }

        user.role="user"
        await user.save()

        res.json({success:true, message:"The user has been successfully reverted back to a regular user",user})
      }catch(err){
        res.status(500).json({success:false,message:err.message})
      }
}
export { loginUser , registerUser }