// require Comment Object

const CommentObject = require("../models/comments.model");

function postComment(req, res) {
    let commentInfo = req.body;
    CommentObject.addNewComment(commentInfo).then(() => {
        res.json();
    }).catch(err => res.json(err));
}

function getCommentsByBlogId(req, res) {
    let blogId = req.query.blogId;
    CommentObject.getCommentsByBlogId(blogId).then(comments => {
        res.json(comments);
    }).catch(err => console.log(err));
}

function getLastFiveCommments(req, res) {
    CommentObject.getLastFiveCommments().then(lastFiveComments => {
        res.json(lastFiveComments);
    }).catch(err => console.log(err));
}

function getCommentInfo(req, res) {
    let commentId = req.query.commentId;
    CommentObject.getCommentInfo(commentId).then(commentInfo => {
        res.json(commentInfo);
    }).catch(err => res.json(err));
}

function putComment(req, res) {
    let commentId = req.params.commentId;
    let newCommentContent = req.body.commentContent;
    CommentObject.editComment(commentId, newCommentContent).then(() => {
        res.json();
    }).catch(err => res.json(err));
}

function deleteComment(req, res) {
    let commentId = req.params.commentId;
    CommentObject.deleteComment(commentId).then(() => {
        res.json();
    }).catch(err => res.json(err));
}

module.exports = {
    postComment,
    getCommentsByBlogId,
    getLastFiveCommments,
    getCommentInfo,
    putComment,
    deleteComment
};