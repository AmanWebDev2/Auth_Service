const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');

const {AuthRequestValidatorMiddleware} = require('../../middlewares/index');

router.post('/signup',AuthRequestValidatorMiddleware.validateUserAuth,UserController.create);
router.post('/signin',AuthRequestValidatorMiddleware.validateUserAuth,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated)

module.exports = router;