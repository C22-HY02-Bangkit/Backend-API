exports.errorMsgTrans = (errors) => {
    let msg = '';

    for (const error of errors) {
        msg = error.msg;
    }

    return msg;
};
