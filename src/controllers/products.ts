import Products from "../models/products"
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
    try {
      const params = req.body;
      if (
        !params.name ||
        !params.code ||
        !params.amount ||
        !params.description ||
        !params.idDistributor
      )
        return res
          .status(400)
          .json({ message: "Enter the resquested parameters" });
  
      const product = await Products.query().insert({
          name: params.name,
          code: params.code,
          description: params.description,
          amount: params.amount,
          idDistributor: params.idDistributor
      });
      return res.status(201).json({product})
    } catch (err) {
      return res.status(500).json(err);
    }
  };

export const getProductId = async (req: Request, res: Response) =>{
    try {
      const params = req.params;
      if(!params.id) return res.status(500).json({message:"Enter the requested parameters"})
      const product = await Products.query().findById(params.id)
      if(!product) return res.status(400).json({message:"No existing product with that Id"})
      return res.status(200).json({product})
  }catch(err){
      return res.status(500).json(err)
  }   
}

export const getProducts = async(req: Request, res: Response) => {
  try {
    const product = await Products.query();
    if(product.length <= 0) return res.status(400).json({message:"No existing product"});
    return res.status(200).json({product})
  }catch(err) {
    return res.status(500).json(err)

  }
}

export const deleteProduct = async(req: Request, res: Response) => {
  try{
    const params = req.params;
    if(!params.id) return res.status(400).json({message:"Enter the requested parameters"})
    const product = await Products.query().deleteById(params.id)
    if(!product) return res.status(400).json({message:"No existing product with that Id"})
    return res.status(200).json({product})
  }catch(err){
    return res.status(500).json(err)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
        const params = req.body;
        if(!id) return res.status(400).json({message:"Enter the requested parameters"})
        const product = await Products.query().findById(id).patch({
            name: params.name,
            code: params.code,
            description: params.description,
            amount: params.amount,
            idDistributor: params.idDistributor
        })
        if(!product) return res.status(400).json({message:"No existing product with that Id"})

        return res.status(200).json({product})
  }catch(err) {
    return res.status(500).json(err)
  }
}