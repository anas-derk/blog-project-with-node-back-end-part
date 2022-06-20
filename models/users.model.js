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

// define create new account function

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

// define user login function

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

// define get user info function

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return UserModel.findOne({_id: userId});
        }).then(userInfo => {
            mongoose.disconnect();
            resolve(userInfo);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

// define edit user info function

function updateUserInfo(userId, newUserInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let password = newUserInfo.password;
            return bcrypt.hash(password, 10);
        }).then(passwordAfterHashing => {
            return UserModel.updateOne({ _id: userId }, {
                userName: newUserInfo.userName,
                email: newUserInfo.email,
                firstName: newUserInfo.firstName,
                middleName: newUserInfo.middleName,
                password: passwordAfterHashing
            });
        }).then(() => {
            mongoose.disconnect();
            resolve()
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function deleteAccount(userId, email) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            // delete user info from users table
            return UserModel.deleteOne({ _id: userId });
        })
        .then(() => {
            // delete all the comments on blogs by this user
            return mongoose.models.comment.deleteMany({ email });
        })
        .then(() => {
            // get all blogs realated to this user
            return mongoose.models.blog.find({ userId })
        })
        .then(userBlogsList => {
            // delete all the comments from people on blogs to this user
            for(userBlog of userBlogsList) {
                return mongoose.models.comment.deleteMany({ blogId: userBlog._id });
            }
        })
        .then(() => {
            // delete all the blogs realated to this user
            return mongoose.models.blog.deleteMany({ userId });
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

module.exports = {
    createNewAccount,
    login,
    getUserInfo,
    updateUserInfo,
    deleteAccount
};