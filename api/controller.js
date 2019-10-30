'use strict';
const pg = require('./postgres-dataaccess');
const cmd = require('./orm-commands');

module.exports = {
    get_posts: (req, res) => Handle(res, () => cmd.GetAll(pg.Post)  pg.GetAllPosts()),
    get_post: (req, res) => Handle(res, `SELECT * FROM post WHERE id = ${req.params.id}`),
    add_post: (req, res) => Handle(res, () => pg.CreatePost(req.body)),
    delete_post: (req, res) => Handle(res, `DELETE FROM post WHERE id = ${req.params.id}`),
    change_post: (req, res) => Handle(res, `UPDATE post SET content = '${req.params.post.content}' WHERE id = ${req.paramas.post.id}`),

    // Topics
    get_topics: (req, res) => Handle(res, () => cmd.GetAll(pg.Topc)),
    get_topic: (req, res) => Handle(res, () => cmd.GetById(pg.Topc, req.params.id)),
    add_topic: (req, res) => Handle(res, () => cmd.Create(pg.Topc, req.body)),
    delete_topic: (req, res) => Handle(res, () => cmd.Delete(pg.Topc, req.params.id)),
    change_topic: (req, res) => Handle(res, () => cmd.Update(pg.Topc, req.body)),
    
    // Author
    get_authors: (req, res) => Handle(res, () => cmd.GetAll(pg.Author)),
    get_author: (req, res) => Handle(res, () => cmd.GetById(pg.Author, req.params.id)),
    add_author: (req, res) => Handle(res, () => cmd.Create(pg.Author, req.body)),
    delete_author: (req, res) => Handle(res, () => cmd.Delete(pg.Author, req.body)),
    change_author: (req, res) => Handle(res, () => cmd.Update(pg.Author, req.body))
}

function Handle(res, query) {
    let promise = query();
    res.send(promise);
}