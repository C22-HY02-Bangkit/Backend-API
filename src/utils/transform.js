exports.errorMsgTrans = (errors) => {
    const msg = {};

    for (const error of errors) {
        msg[error.param] = error.msg;
    }

    return msg;
};
