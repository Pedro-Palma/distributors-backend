import  Joi from "@hapi/joi"

 export  const distributorSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    emailNotification: Joi.string().required(),
    emailAlert: Joi.string().required(),
})

export  const distributorSchemaId = Joi.object({
    id: Joi.number().required(),
})