// require authentication Object

const authObject = require("../models/auth.model");

function postSignUp(req, res){
    let userInfo = req.body;
    authObject.createNewAccount(userInfo).then(() => {
        res.json(userInfo);
    }).catch(err => res.json(err));
}

function getLoginIn(req, res){
    let email = req.query.email,
        password = req.query.password;
    authObject.login(email, password).then(user => {
        res.json(user);
    }).catch(err => res.json(err));
}

module.exports = { postSignUp, getLoginIn };