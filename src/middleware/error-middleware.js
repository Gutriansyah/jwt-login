import { ResponseEror } from "../error/response-error.js";

const erroMidlleware = (error, req, res, next) => {
    if (!error) {
        next();
        return;
    }

    if (error instanceof ResponseEror) {
        res.status(error.status)
            .json({
                errors: error.message,
            })
            .end();
    } else {
        res.status(500)
            .json({
                errors: error.message,
            })
            .end();
    }
};

export { erroMidlleware };
