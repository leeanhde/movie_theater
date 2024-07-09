const bcrypt = require("bcrypt");
const db = require('../model');
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const config = require("../config/auth.config");

const {role: Role, user: User} = db;

// Register action
async function register(req, res, next){
    try {
        if(req.body){
            const newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,parseInt(process.env.PASSWORD_KEY)),
                dob: req.body.dob,
                gender: req.body.gender,
                username: req.body.username,
                fullName: req.body.fullName,
                identityCard: req.body.identityCard,
                image: req.body.image,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            });

            // Kiem tra roles trong req.body co ton tai trong DB khong
            if(req.body.roles){
                const roles = await Role.find({name: {$in: req.body.roles}}).exec();
                console.log(roles);
                // Set cac gia tri cho roles cua newUser
                newUser.roles = roles.map(r => r._id); // Hoac dung toan tu rai vao thuoc tinh roles
                await User.create(newUser)
                    .then(createdUser => res.status(201).json(createdUser));
                return;
            }else{
                const role = await Role.findOne({name: "member"}).exec();
                newUser.roles = [role._id];
                await User.create(newUser)
                    .then(createdUser => res.status(201).json(createdUser));
                return;
            }
        }
    } catch (error) {
        next(error);
    }
}

// Login action
async function login(req, res, next){
    try {
        if(!req.body.email || !req.body.password)
            throw createHttpError.BadRequest("Email or password is required");

        const existUser = await User.findOne({email: req.body.email}).populate("roles", "-__v").exec();
        if(!existUser){
            throw createHttpError.BadRequest("This email does not exist");
        }
        // const isMatchPassword = bcrypt.compareSync(req.body.password,existUser.password);
        // console.log(existUser.password);
        // console.log(existUser.email);
        // console.log(req.body.password);
        // console.log(isMatchPassword);
        if(req.body.password !== existUser.password){
            throw createHttpError.BadRequest("Password incorrect");
        }
        // Generate AccessToken
        let token = jwt.sign({id: existUser._id}, config.secret, {
            algorithm: "HS256",
            expiresIn: config.jwtExpiration
        });
        // console.log(token);
        
        let authorities = [existUser.roles];

        // Send object to Client
        res.status(200).json({
            id: existUser._id,
            email: existUser.email,
            roles: authorities,
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

// Logout action
async function logout(req, res, next){
    try {
        
    } catch (error) {
        next(error);
    }
}

// RefreshToken action
async function refreshToken(req, res, next){
    try {
        
    } catch (error) {
        next(error);
    }
}


const AuthController = {
    register,
    login,
    logout,
    refreshToken
};

module.exports = AuthController;