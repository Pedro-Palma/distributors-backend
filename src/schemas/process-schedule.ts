import  Joi from "@hapi/joi"

 export  const scheduleSchema = Joi.object({
    finishTime: Joi.string().required(),
    startTime: Joi.string().required(),
    idDistributor: Joi.number().required(),

})

export  const scheduleSchemaId = Joi.object({
    id: Joi.number().required(),
})