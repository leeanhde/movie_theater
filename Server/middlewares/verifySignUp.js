const httpErrors = require("http-errors");
const db = require("../model");

const {user: User, role: Role} = db;

// Kiem tra user da ton tai tu DB
async function checkExistUser(req, res, next){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            throw httpErrors.BadRequest("Email or password is required");
        }
        if(await User.findOne({email: req.body.email})){
            throw httpErrors.BadRequest("This is email existing");
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function checkExistRoles(req, res, next){
    try {
        if(req.body.roles){
            let ROLES = [];
            const roles = await Role.find({});
            roles?.map(r => ROLES.push(r.name)); // ROLES = [Member, Guest, Staff, Supervisor, Admin]

            for(let i =0; i<req.body.roles.length; i++){
                if(!ROLES.includes(req.body.roles[i])){
                    throw httpErrors.BadRequest(`Role '${req.body.roles[i]}' does not exist`);
                }
            }
            next();
        }
    } catch (error) {
        next(error);
    }
}

const VerifySignUp = {
    checkExistUser,
    checkExistRoles
}

module.exports = VerifySignUp;