import  Joi from "@hapi/joi"

 export  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    code: Joi.string().required(),
    idDistributor: Joi.number().required(),

})

export  const userSchemaId = Joi.object({
    id: Joi.number().required(),
})