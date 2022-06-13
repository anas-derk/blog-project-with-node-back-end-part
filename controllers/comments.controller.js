// require Comment Object

const CommentObject = require("../models/comments.model");

function postComment(req, res) {
    let commentInfo = req.body;
    CommentObject.addNewComment(commentInfo).then(() => {
        res.json();
    }).catch(err => console.log(err));
}

function getCommentsByBlogId(req, res) {
    let blogId = req.query.blogId;
    CommentObject.getCommentsByBlogId(blogId).then(comments => {
        res.json(comments);
    }).catch(err => console.log(err));
}

module.exports = {
    postComment,
    getCommentsByBlogId
};