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
        // Get the access token from the request        
        const token = req.headers.authorization.split(' ')[1];        
        // Verify the token        
        jwt.verify(token, config.secret, (err, decoded) => {            
            if (err) {                
                return res.status(403).json({ message: 'Failed to authenticate token.' });            
            }            
            // Find the user by the decoded id            
            User.findById(decoded.id, (err, user) => {                
                if (err) {                    
                    return res.status(500).json({ message: 'Error finding user.' });                
                }                
                if (!user) {                    
                    return res.status(404).json({ message: 'User not found.' });                
                }                
                // Set the user's token to null to log them out                
                user.token = null;                
                user.save((err) => {                    
                    if (err) {                        
                        return res.status(500).json({ message: 'Error logging out user.' });                    
                    }                    
                    res.status(200).json({ message: 'Logged out successfully.' });                
                });            
            });        
        });    
    } catch (error) {       
         next(error);    
        }}
        
        // RefreshToken action
        async function refreshToken(req, res, next){    
            try {        
                // Get the refresh token from the request        
                const refreshToken = req.body.refreshToken;        
                // Verify the refresh token        
                jwt.verify(refreshToken, config.secret, (err, decoded) => {            
                    if (err) {                
                        return res.status(403).json({ message: 'Failed to authenticate token.' });            
                    }            
                    // Find the user by the decoded id            
                    User.findById(decoded.id, (err, user) => {                
                        if (err) {                    
                            return res.status(500).json({ message: 'Error finding user.' });                
                        }                
                        if (!user) {                    
                            return res.status(404).json({ message: 'User not found.' });                
                        }                
                        // Generate a new access token                
                        const newAccessToken = jwt.sign({ id: user._id }, config.secret, {                    
                            algorithm: "HS256",                    
                            expiresIn: config.jwtExpiration                
                        });                
                        res.status(200).json({                    
                            accessToken: newAccessToken                
                        });            
                    });        
                });    
            } catch (error) {        
                next(error);    
            }}

async function forgotPassword(req, res, next) {    
    try {        
        const { email } = req.body;        
// Check if the email exists in the database        
const user = await User.findOne({ email });        
if (!user) {            
    return res.status(404).json({ message: 'Email not found' });        
}        
// Generate a reset token        
const resetToken = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });        
// Update the user's reset token and expiration date        
user.resetToken = resetToken;        
user.resetTokenExpiration = Date.now() + 3600000; // 1 hour        
await user.save(); 

// Send the reset password email        
const transporter = nodemailer.createTransport({            
    service: 'gmail',            
    auth: {                
        user: 'your-email@gmail.com',                
        pass: 'your-password'            
    }        
});        
const mailOptions = {            
    from: 'your-email@gmail.com',            
    to: email,            
    subject: 'Reset your password',            
    text: `Please click the following link to reset your password: ${config.frontendUrl}/reset-password/${resetToken}`        
};        
await transporter.sendMail(mailOptions);        
res.status(200).json({ message: 'Password reset instructions have been sent to your email' });    
} catch (error) {        
    next(error);    
}}

// Reset Password action
async function resetPassword(req, res, next) {    
    try {        
        const { token, newPassword } = req.body;        
        // Verify the reset token        
        const decoded = jwt.verify(token, config.secret);        
        const user = await User.findById(decoded.userId);        
        if (!user || user.resetToken !== token || user.resetTokenExpiration < Date.now()) {            
            return res.status(400).json({ message: 'Invalid or expired reset token' });        
        }        
        // Update the user's password        
        user.password = bcrypt.hashSync(newPassword, parseInt(process.env.PASSWORD_KEY));        
        user.resetToken = null;        
        user.resetTokenExpiration = null;        
        await user.save();        
        res.status(200).json({ message: 'Password reset successfully' });    
    } catch (error) {        
        next(error);    
    }}


const AuthController = {
    register,
    login,
    logout,
    refreshToken,    
    forgotPassword,    
    resetPassword
};

module.exports = AuthController;