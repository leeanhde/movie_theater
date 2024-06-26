const httpError = require('http-errors');
const db = require('../model');
const createHttpError = require('http-errors');

const {  } = db;
//kiem tra user da ton tai tu database
async function checkExistUser(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw httpError.BadRequest("email or password is reuired");
        }
        if (await Person.findOne({ email })) {
            throw httpError.BadRequest("email existed!!!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function checkExistRoles(req, res, next) {
    try {
        
        next();
    } catch (error) {
        next(error);
    }
}

const VerifySignUp = {
    checkExistUser, checkExistRoles
}
module.exports = VerifySignUp;