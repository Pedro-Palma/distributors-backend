import { Request, Response } from "express";
import Channel_authorization from "../models/channel-authorization";

export const createChannel = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    if (!params.name || !params.code || !params.idDistributor)
      return res
        .status(500)
        .json({ message: "Enter the resqueted parameters" });

        const channel = await Channel_authorization.query().insert({
            name: params.name,
            code: params.code,
            idDistributor: params.idDistributor
        })

        return res.status(200).json({channel})
  } catch (err) {
      return res.status(500).json(err)
  }
};

export const getChannelId = async (req: Request, res: Response)=>{
    try{
        const params = req.params;
        if(!params.id) return res.status(500).json({message:"Enter the requested parameters"})
        const channel = await Channel_authorization.query().findById(params.id)
        if(!channel) return res.status(500).json({message:"No existing channel with that Id"})
        return res.status(200).json({channel})


    } catch (err) {
        return res.status(500).json(err)

    }
}

export const getChannels = async (req: Request, res: Response)=>{
try{
    const channel = await Channel_authorization.query();
    if(channel.length <= 0) return res.status(500).json({message:"No existing channel"});
    return res.status(200).json({channel})
}catch (err) {
    return res.status(500).json(err)
}
}

export const deleteChannel = async (req: Request, res: Response) =>{
    try{
        const params = req.params;
    if(!params.id) return res.status(500).json({message:"Enter the requested parameters"})
    const channel = await Channel_authorization.query().deleteById(params.id)
    if(!channel) return res.status(500).json({message:"No existing channel with that Id"})
    return res.status(200).json({channel})
    }catch (err) {
    return res.status(500).json(err)    
    }
}

export const updateChannel = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const params = req.body;
        if(!id) return res.status(500).json({message:"Enter the requested parameters"})
        const channel = await Channel_authorization.query().findById(id).patch({
            name: params.name,
            code: params.code,
            idDistributor: params.idDistributor
        })
        if(!channel) return res.status(500).json({message:"No existing channel with that Id"})

        return res.status(200).json({channel})
    }catch (err) {
        return res.status(500).json(err)
    }
}