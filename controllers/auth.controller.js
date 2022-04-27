// require authentication Object

const authObject = require("../models/auth.model");

function postSignUp(req, res){
    let userInfo = req.body;
    authObject.createNewAccount(userInfo).then(() => {
        res.json(userInfo);
    }).catch(err => res.json(err));
}

module.exports = { postSignUp };