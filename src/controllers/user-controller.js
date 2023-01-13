const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: 'successfully created a new user',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success: false,
            message: "something went wrong",
            err: error
        })
    }
}

const signIn = async(req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'successfully signed in',
            err: {}
        })
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            data:{},
            success: false,
            message: "something went wrong",
            err: error
        })
    }
}

const isAuthenticated = async(req,res) => {
    try {
        const token = req.headers['x-access-token'];
        // not a good place to verify
        // const isVerified = userService.validateToken(token); //{ email: '',id: '' ,iat:'' ,exp:'' }
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'user is authenticated and token is valid',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success: false,
            message: "something went wrong",
            err: error
        }) 
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}