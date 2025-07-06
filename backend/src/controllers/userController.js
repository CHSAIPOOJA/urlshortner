import { User } from "../models/user/user.model.js";

export const getMyDetails= async(req, res)=>{
    try{
    const userId= req.user.id; // Assuming you have middleware that sets req.user
    let user=await User.findById(userId);
    console.log(user);
    return res.status(200).send(user);
    }
    catch(error){
        
        return res.status(500).send({ status: "Internal Server Error" });
    }
}