import  Joi from "@hapi/joi"

 export  const channelSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    idDistributor: Joi.number().required(),
})

export  const channelSchemaId = Joi.object({
    id: Joi.number().required(),
})