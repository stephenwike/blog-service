module.exports = {
    // ORM Injection
    SetORM: (orm) => { this.db = orm.Domain, this.cmd = orm.Commands },

    // Posts
    create_post: (post) => {
        if (!post) throw "No post object received.";
        if (!post.authorId) throw "Post does not contain an author.";
        if (!post.title) throw "Post does not contain a title.";
        if (!post.content) throw "Post does not contain any content";

        return this.cmd.Create(this.db.Post, post);
    },

    // Authors
    get_author_by_name: (name) => {
        this.cmd.GetByName(db.Author, name);
    },


    // Comments
    get_comments: (req, res) => Handle(res, () => cmd.GetAll(db.Comment)),
    get_comment: (req, res) => Handle(res, () => cmd.GetById(db.Comment, req.params.id)),
    add_comment: (req, res) => Handle(res, () => cmd.Create(db.Comment, req.body)),
    delete_comment: (req, res) => Handle(res, () => cmd.Delete(db.Comment, req.body)),
    change_comment: (req, res) => Handle(res, () => cmd.Update(db.Comment, req.body)),

    // PostTopics
    get_posttopics: (req, res) => Handle(res, () => cmd.GetAll(db.PostTopic)),
    get_posttopic: (req, res) => Handle(res, () => cmd.GetById(db.PostTopic, req.params.id)),
    add_posttopic: (req, res) => Handle(res, () => cmd.Create(db.PostTopic, req.body)),
    delete_posttopic: (req, res) => Handle(res, () => cmd.Delete(db.PostTopic, req.body)),
    change_posttopic: (req, res) => Handle(res, () => cmd.Update(db.PostTopic, req.body)),

    // Posts
    get_posts: (req, res) => Handle(res, () => cmd.GetAll(db.Post)),
    //get_post: (req, res) => Handle(res, () => cmd.GetById(db.Post, req.params.id)),
    get_post: (req, res) => Handle(res, async () => {
        console.log("what the fork?");
        let id = req.params.id;
        console.log(id);
        return cmd.GetById(db.Post, id).then(r1 => {
            console.log(r1);
            return db.Comment.findAll({ where: { postId: id } }).then(r2 => {
                console.log("Found Posts!");
                let post = r1.dataValues;
                console.log(r2.dataValues);
                console.log("----------------------");
                console.log(post);
                post.comments = r2.dataValues;
                console.log("----------------------");
                console.log(post);
                blog.Contagios("Coding");
                return post;
            })
        })
    }),
    // {
    //     let post = await pg.Post.findOne({ where: { id: req.params.id } });
    //     post.comments 


    //.then(r1 => {
    //     pg.Comment.findAll({ where: { post: req.params.id } });
    //     post = r1.dataValues;
    // }).then(r2 => {
    //     pg.PostTopic.findAll({ where: { postid: req.params.id } });
    //     post.comments = r2.dataValues;
    // }).then(r3 => {
    //     for (let topic of r3.dataValues)
    //     {
    //         pg.Topic.findAll({ where: { id: r3.dataValues.topicid } })
    //     }

    //     post.
    //     return post;
    // }).catch(err => console.log(err));
    // }),

    add_post: (req, res) => Handle(res, () => cmd.Create(db.Post, req.body)),
    delete_post: (req, res) => Handle(res, () => cmd.Delete(db.Post, req.body)),
    change_post: (req, res) => Handle(res, () => cmd.Update(db.Post, req.body)),

    // Topics
    get_topics: (req, res) => Handle(res, () => cmd.GetAll(db.Topc)),
    get_topic: (req, res) => Handle(res, () => cmd.GetById(db.Topc, req.params.id)),
    add_topic: (req, res) => Handle(res, () => cmd.Create(db.Topc, req.body)),
    delete_topic: (req, res) => Handle(res, () => cmd.Delete(db.Topc, req.params.id)),
    change_topic: (req, res) => Handle(res, () => cmd.Update(db.Topc, req.body)),

    // Author
    get_authors: (req, res) => Handle(res, () => cmd.GetAll(db.Author)),
    get_author: (req, res) => Handle(res, () => cmd.GetById(db.Author, req.params.id)),
    add_author: (req, res) => Handle(res, () => cmd.Create(db.Author, req.body)),
    delete_author: (req, res) => Handle(res, () => cmd.Delete(db.Author, req.body)),
    change_author: (req, res) => Handle(res, () => cmd.Update(db.Author, req.body))
}

function Handle(res, query) {
    query().then(r => { res.send(r); }).catch(err => res.send(err));
}