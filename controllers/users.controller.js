// require authentication Object

const userObject = require("../models/users.model");

function postSignUp(req, res){
    let userInfo = req.body;
    userObject.createNewAccount(userInfo).then(() => {
        res.json();
    }).catch(err => res.json(err));
}

function getLoginIn(req, res){
    let email = req.query.email,
        password = req.query.password;
    userObject.login(email, password).then(user => {
        res.json(user);
    }).catch(err => res.json(err));
}

function getUserInfo(req, res) {
    let userId = req.query.userId;
    userObject.getUserInfo(userId).then(userInfo => {
        res.json(userInfo);
    }).catch(err => console.log(err));
}

function putUserInfo(req, res) {
    let userId = req.params.userId;
    let newUserInfo = req.body;
    userObject.updateUserInfo(userId, newUserInfo).then(() => {
        res.json({ _id: userId, ...newUserInfo });
    }).catch(err => console.log(err));
}

module.exports = { postSignUp, getLoginIn, getUserInfo, putUserInfo };