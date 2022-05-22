exports.register = (req, res) => {
    const { fullname, email, password, password2 } = req.body;

    res.json({
        code: 200,
        status: 'success',
        message: 'User created',
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    
    res.json({
        code: 200,
        status: 'success',
        message: 'Login success',
    });
};
