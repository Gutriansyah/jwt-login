import { prismaClient } from "../application/database.js";
import { ResponseEror } from "../error/response-error.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    searchUserValidation,
} from "../validation/login-validate.js";
import { validate } from "../validation/validation.js";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username,
        },
    });

    if (countUser === 1) {
        throw new ResponseEror(400, "username already exist");
    }

    const userPasword = await bycript.hash(user.password, 10);

    user.password = userPasword;

    return prismaClient.user.create({
        data: user,
    });
};

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email,
        },
    });

    if (!user) {
        throw new ResponseEror(404, "user not found");
    }

    const userValid = await bycript.compare(
        loginRequest.password,
        user.password
    );

    if (!userValid) {
        throw new ResponseEror(401, "email or password wrong");
    }

    const payload = {
        username: user.username,
        name: user.name,
        email: user.email,
    };

    const secret = process.env.JWT_SECRET;
    const expiredIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, {
        expiresIn: expiredIn,
    });

    return { message: "login succeess", token: token };
};

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        },
        select: {
            name: true,
            username: true,
            email: true,
        },
    });

    if (!user) {
        throw new ResponseEror(404, "user not found");
    }

    return user;
};

const search = async (request) => {
    request = validate(searchUserValidation, request);

    const skip = (request.page - 1) * request.size;

    const filter = [];

    if (request.name) {
        filter.push({
            name: request.name,
        });
    }

    if (request.username) {
        filter.push({
            name: request.username,
        });
    }

    if (request.email) {
        filter.push({
            name: request.email,
        });
    }

    const user = await prismaClient.user.findMany({
        where: {
            AND: filter,
        },
        skip: skip,
        take: request.size,
    });

    const totalItem = await prismaClient.user.count({
        where: {
            AND: filter,
        },
    });

    return {
        data: user,
        paging: {
            page: request.page,
            total_item: totalItem,
            total_page: Math.ceil(totalItem / request.size),
        },
    };
};

export default {
    register,
    login,
    get,
    search,
};
