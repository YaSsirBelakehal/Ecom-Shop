import notificationsModel from "../models/notificationsModel.js";
import orderModel from "../models/orderModel.js"



export const getAllNotifications = async(req,res)=>{
    try{
        const notifications = await notificationsModel.find().sort({createdAt:-1})
        res.json({success:true, data:notifications})
    }catch(err){
        console.error("Error fetching notifications",err)
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const deleteNotification = async(req,res)=>{
    try{
        const {id} = req.params
        await notificationsModel.findByIdAndDelete(id)
        res.json({success:true, message:"notification deleted"})
    }catch(err){
        console.error(err)
        res.status(500).json({success:false, message:"Failed to delete"})
    }
}

export const clearAllNotifications = async(req,res)=>{
    try{
        await notificationsModel.deleteMany({})
        res.json({success:true, message:"All notifications deleted"})
    }catch(err){
        console.error(err)
        res.status(500).json({success:false, message:"Failed to delete all"})
    }
}

export const markAsRead = async(req,res)=>{
    try{
        const {id} = req.params
        await notificationsModel.findByIdAndUpdate(id, {isRead : true})
        res.json({success:true, message:"notification marked as read"})
    }catch(err){
        res.status(500).json({success:false, message:"Failed to update"})
    }
}

export const createNotificationForOrder = async(orderData)=>{
    try{
        const {userId, _id} = orderData
        await notificationsModel.create({
            message:`A new request has been created with number ${_id}`,
            orderId:_id,
            user:userId || "Anonymous user"
        })
    }catch(err){
        console.error("Failed to create request notification:", err)
    }
}