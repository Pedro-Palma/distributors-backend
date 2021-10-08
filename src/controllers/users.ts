import Users from "../models/users";
import { Request, Response } from "express";
import { userSchema, userSchemaId } from "../schemas/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = userSchema.validate(req.body);

    
    if (error)
      return res
        .status(400)
        .json({ message: "Enter the resquested parameters" });
        const params = req.body;
    const user = await Users.query().insert({
      name: params.name,
      phoneNumber: params.phoneNumber,
      code: params.code,
      email: params.email,
      idDistributor: params.idDistributor,
    });
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json(err);
  }
};


export const getUserId = async (req: Request, res: Response) =>{
    try {
      const { error, value } = userSchemaId.validate(req.params);
      if(error) return res.status(500).json({message:"Enter the requested parameters"})

      const params = req.params;
      const user = await Users.query().findById(params.id)
      if(!user) return res.status(400).json({message:"No existing users   with that Id"})
      return res.status(200).json({user})
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getUsers = async (req: Request, res: Response)=>{
  try{
      const user = await Users.query();
      if(user.length <= 0) return res.status(400).json({message:"No existing user "});
      return res.status(200).json({user})
  }catch (err) {
      return res.status(500).json(err)
  }
  }

  export const deleteUser = async (req: Request, res: Response) =>{
    try{
      const { error, value } = userSchemaId.validate(req.params);
      if(error) return res.status(400).json({message:"Enter the requested parameters"})

        const params = req.params;
    const user = await Users.query().deleteById(params.id)
    if(!user) return res.status(400).json({message:"No existing users with that Id"})
    return res.status(200).json({user})
    }catch (err) {
    return res.status(500).json(err)    
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = userSchemaId.validate(req.params);
      if(error) return res.status(400).json({message:"Enter the requested parameters"})
        const id = req.params.id;
        const params = req.body;
        const user = await Users.query().findById(id).patch({
            name: params.name,
            phoneNumber: params.phoneNumber,
            code: params.code,
            email: params.email,
            idDistributor: params.idDistributor
        })
        if(!user) return res.status(400).json({message:"No existing users with that Id"})

        return res.status(200).json({user})
    }catch (err) {
        return res.status(500).json(err)
    }
}