import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().required().max(100),
    email: Joi.string().required().max(100).email(),
    name: Joi.string().optional().max(100),
    password: Joi.string().required().max(100),
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const searchUserValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    username: Joi.string().max(100).optional(),
    email: Joi.string().email().max(100).optional(),
});

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    searchUserValidation,
};
