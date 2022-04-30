// require authentication Object

const usersObject = require("../models/users.model");

function postSignUp(req, res){
    let userInfo = req.body;
    usersObject.createNewAccount(userInfo).then(() => {
        res.json();
    }).catch(err => res.json(err));
}

function getLoginIn(req, res){
    let email = req.query.email,
        password = req.query.password;
    usersObject.login(email, password).then(user => {
        res.json(user);
    }).catch(err => res.json(err));
}

module.exports = { postSignUp, getLoginIn };