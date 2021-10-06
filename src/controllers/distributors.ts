import Distributors from "../models/distributors";

import { Request, Response } from "express";

export const createDistributor = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    if (
      !params.name ||
      !params.code ||
      !params.emailAlert ||
      !params.emailNotification
    )
      return res
        .status(500)
        .json({ message: "Enter the resquested parameters" });

    const distributor = await Distributors.query().insert({
        name: params.name,
        code: params.code,
        emailAlert: params.emailAlert,
        emailNotification: params.emailNotification
    })
    return res.status(200).json({distributor})
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getDistributorId = async (req: Request, res: Response) =>{
    try {
        const params = req.params;
        if(!params.id) return res.status(500).json({message:"Enter the requested parameters"})
        const distributor = await Distributors.query().findById(params.id)
        if(!distributor) return res.status(500).json({message:"No existing distributors with that Id"})
        return res.status(200).json({distributor})
    }catch(err){
        return res.status(500).json(err)
    }   
}

export const getDistributors = async (req: Request, res: Response)=>{
    try {
        const distributor = await Distributors.query();
        if(distributor.length <= 0) return res.status(500).json({message:"No existing distributors"});
        return res.status(200).json({distributor})
    }catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteDistributor = async (req: Request, res: Response)=>{
    try{
        const params = req.params;
        if(!params.id) return res.status(500).json({message:"Enter the requested parameters"})
        const distributor = await Distributors.query().deleteById(params.id)
        if(!distributor) return res.status(500).json({message:"No existing distributors with that Id"})
        return res.status(200).json({distributor})
    }catch(err) {
        return res.status(500).json(err)
    }
}

export const updateDistributor = async (req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const params = req.body;
        if(!id) return res.status(500).json({message:"Enter the requested parameters"})
        const distributor = await Distributors.query().findById(id).patch({
            name: params.name,
            code: params.code,
            emailAlert: params.emailAlert,
            emailNotification: params.emailNotification
        })
        if(!distributor) return res.status(500).json({message:"No existing distributor with that Id"})

        return res.status(200).json({distributor})
    }catch(err) {
        return res.status(500).json(err)
    }
}