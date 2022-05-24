const AppError = require('./AppError');

exports.checkBodyPayload = (body, payload) => {
    for (const key in body) {
        if (!payload.includes(key)) {
            throw new AppError(`${key} is not valid!`, 400);
        }
    }
};
