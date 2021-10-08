import  Joi from "@hapi/joi"

 export  const productSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    idDistributor: Joi.number().required(),
})

export  const productSchemaId = Joi.object({
    id: Joi.number().required(),
})