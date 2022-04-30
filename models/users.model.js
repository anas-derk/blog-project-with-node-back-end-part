// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create User Schema For User Model

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    firstName: String,
    middleName: String,
    password: String
});

// create User Model In Database

let UserModel = mongoose.model("user", userSchema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// create create new account function

function createNewAccount(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return UserModel.findOne({email: userInfo.email});
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                let password = userInfo.password;
                return bcrypt.hash(password, 10);
            }
        })
        .then(encryptedPassword => {
            userInfo.password = encryptedPassword;
            let newUser = new UserModel(userInfo);
            return newUser.save();
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return UserModel.findOne({email: email});
        }).then(user => {
            if (!user) {
                mongoose.disconnect();
                reject("عذراً الإيميل الذي ادخلته غير موجود ، رجاءً أدخل إيميل آخر من فضلك ...");
            } else {
                bcrypt.compare(password, user.password).then(passwordIsTrue => {
                    switch(passwordIsTrue){
                        case true: {
                            mongoose.disconnect();
                            resolve(user);
                        }
                        default: {
                            mongoose.disconnect();
                            reject("كلمة السر التي أدخلتها غير صحيحة ، من فضلك أعد إدخال كلمة السر بشكل صحيح ..");
                        }
                    }
                });
            }
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    })
}

module.exports = { createNewAccount, login };