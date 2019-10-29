'use strict';
const pg = require('./postgres-dataaccess');

module.exports = {
    get_posts: (req, res) => Handle(res, () => pg.GetAllPosts()),
    get_post: (req, res) => Handle(res, `SELECT * FROM post WHERE id = ${req.params.id}`),
    add_post: (req, res) => Handle(res, () => pg.CreatePost(req.body)),
    delete_post: (req, res) => Handle(res, `DELETE FROM post WHERE id = ${req.params.id}`),
    change_post: (req, res) => Handle(res, `UPDATE post SET content = '${req.params.post.content}' WHERE id = ${req.paramas.post.id}`),

    get_authors: (req, res) => Handle(res, () => pg.GetAllAuthors()),
    get_author: (req, res) => Handle(res, () => pg.GetAuthorById(req.params.id)),
    add_author: (req, res) => Handle(res, () => pg.CreateAuthor(req.body)),
    delete_author: (req, res) => Handle(res, `DELETE FROM author WHERE id = ${req.params.id}`),
    change_author: (req, res) => Handle(res, () => pg.UpdateAuther(req.body)),
}

function Handle(res, query) {
    let promise = query();
    res.send(promise);
}