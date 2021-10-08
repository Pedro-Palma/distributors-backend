import Products from "../models/products"
import { Request, Response } from "express";
import { productSchema,productSchemaId } from "../schemas/product";

export const createProduct = async (req: Request, res: Response) => {
    try {
      const { error, value } = productSchema.validate(req.body);
      if (
        error
      )
        return res
          .status(400)
          .json({ message: "Enter the resquested parameters" });
          const params = req.body;

  
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
      const { error, value } = productSchemaId.validate(req.params);

       if(error) return res.status(500).json({message:"Enter the requested parameters"})
       const params = req.params;
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
    const { error, value } = productSchemaId.validate(req.params);
    if(error) return res.status(500).json({message:"Enter the requested parameters"})
    const params = req.params;    
    const product = await Products.query().deleteById(params.id)
    if(!product) return res.status(400).json({message:"No existing product with that Id"})
    return res.status(200).json({product})
  }catch(err){
    return res.status(500).json(err)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try{
    const { error, value } = productSchemaId.validate(req.params);
    if(error) return res.status(500).json({message:"Enter the requested parameters"})
    const params = req.body;    
    const id = req.params.id;
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