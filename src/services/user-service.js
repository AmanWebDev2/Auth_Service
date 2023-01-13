const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');

class UserService {

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in service layer');
            throw { error };
        }
    }

    async destroy(userId) {
        try {
            const response = await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
            console.log('something went wrong in service layer');
            throw { error };
        }
    }

    async getById(userId) {
        try {
            const user = this.userRepository.getById(userId);
            return user;
        } catch (error) {
            console.log('something went wrong in service layer');
            throw { error };
        }
    }

    async signIn(email,plainPassword){
        try {
            // step 1 -> fetch the user using the email
            const user = await this.userRepository.getbyEmail(email);
            // step 2 -> compare password
            const passwordMatched = this.checkPassword(plainPassword,user.password);

            if(!passwordMatched) {
                console.log('password does not match ');
                throw {error: 'Incorrect password'};
            }

            // step 3-> create jwt
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;

        } catch (error) {
            console.log('something went wrong in signin');
            throw { error };
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user,JWT_KEY,{ expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log('something went wrong in token creation');
            throw { error };
        }
    }

    validateToken(token) {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log('something went wrong in token validation');
            throw { error };
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log('something went wrong in token validation');
            throw { error };
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.validateToken(token);
            if(!response) {
                throw { error: "Invalid token" }
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw { error: "No user with the corresponding token exist" };
            }
            return user.id;
        } catch (error) {
            onsole.log('something went wrong in the auth process');
            throw { error };
        }
    }
}

module.exports = UserService;