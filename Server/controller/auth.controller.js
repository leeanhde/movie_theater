const db = require('../model');
const bcrypt = require('bcrypt');
const { create } = require('../model/person.model');
const Role = db.role;
const Person = db.person;


//Create register user
async function register(req, res, next) {
    try {
        if (req.body) {
            const newPerson = new Person({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
                dob: req.body.dob,
                gender: req.body.gender,
                role: req.body.role
            })

            // kiem tra role trong req.body co ton tai trong db khong
            if (req.body.role) {
                const roles = await Role.find({ name: { $in: req.body.role } });
                // Set cac gia tri cho new Person
                newPerson.roles = roles.map(r => r._id); // hoac dung toan tu vao thuoc tinh role
                await Person.create(newPerson)
                res.status(200).json(newPerson);
                return;
            } else {
                const role = await Role.findOne({ name: 'member' }).exec();
                newPerson.roles = [role._id];
                await Person.create(newPerson)
                res.status(200).json(newPerson);
                return;
            }
        }
    } catch (error) {
        next(error);
    }
}

const AuthController = {
    register
}
module.exports = AuthController;