import {nanoid} from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";    

export const shortUrl = async (req, res) => {
 try {


      const userId = req.user.id; // user id
      const { originalUrl , expiresAt, title , customUrl } = req.body // request body
      if(!originalUrl){ // missing original url in the payload
        return res.status(400).send({status : "missing originalUrl in the payload"});
      }
      let shortCode = "";
      if(customUrl){
           shortCode = customUrl;
           let existData = await ShortURL.findOne({shortCode});
           if(existData) return res.status(400).send({status : "try with a new custom url"});
      }else{
           shortCode = nanoid(7);
           let isUnique = false;
           while(!isUnique){
               const existData = await ShortURL.findOne({shortCode});
               if(!existData) isUnique = true;
               else shortCode = nanoid(7);
           }
      }
      const newURL = new ShortURL({
           originalUrl ,
           shortCode,
           userId,
           // expiresAt :  expiresAt ? expiresAt : new Date().date() + 30
      })
      await newURL.save();
      return res.status(200).send(newURL);
 } catch (error) {
   console.log(error);
   return res.status(500).send({ status: "INTERNAL_SERVER_ERROR" });
 }
};



export const RouterredirectFunction = async (req, res) => {
  try {
    
    const shortCode=req.params.shortCode; // get the short code from the request params

    const data=await ShortURL.findOne({ shortCode }); // find the short url in the database

    if(!data) {
        return res.status(404).send({status :"NOT_FOUND"});
    }
    res.redirect(data.originalUrl); // redirect to the original url

  } 
  catch (error) {
    console.log(error);
    return res.status(500).send({ status: "INTERNAL_SERVER_ERROR" });
  }
};
