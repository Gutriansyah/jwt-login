import loginService from "../service/login-service.js";

const register = async (req, res, next) => {
    try {
        const result = await loginService.register(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await loginService.login(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await loginService.get(username);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const search = async (req, res, next) => {
    try {
        const request = req.query;
        const result = await loginService.search(request);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    get,
    search,
};
