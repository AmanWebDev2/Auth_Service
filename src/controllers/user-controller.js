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
        return res.status(error.statusCode).json({
            data:{},
            success: false,
            message: error.message,
            err: error.explanation
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
         console.log("asd",error);
        return res.status(error.statusCode).json({
            data:{},
            success: false,
            message: error.message,
            err: error.explanation
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

const isAdmin = async(req,res) =>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'successfully fetched wether user having admin role or not',
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
    isAdmin,
    isAuthenticated,
}