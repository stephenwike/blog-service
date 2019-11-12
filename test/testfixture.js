const pg = require('../api/orm/orm');
const cmd = require('../api/orm/orm-commands');
_entityContext = { Setup: (done) => done() };

var exports = module.exports = {
    SetEntityContext: (entity) => _entityContext = entity,
    TestEntities: [
        {
            Setup: (done) => { done(); },
            name: "Author",
            type: pg.Author,
            CreateOfType: { name: "billy" },
            CreateProp: "name",
            FetchCreateOfType: { name: "susie" },
            UpdateCreateOfType: { name: "jack" },
            UpdateProp: "name",
            UpdateValue: "new jack",
            Create1: { name: "john" },
            Create2: { name: "jacob" },
            Create3: { name: "jingle" },
            EntityToDelete: { name: "robert" }
        },
        {
            Setup: (done) => { done(); },
            name: "Topic",
            type: pg.Topic,
            CreateOfType: { label: "thistopic" },
            CreateProp: "label",
            FetchCreateOfType: { label: "atopic" },
            UpdateCreateOfType: { label: "newlabel" },
            UpdateProp: "label",
            UpdateValue: "updatedtopic",
            Create1: { label: "zlabel" },
            Create2: { label: "ylabel" },
            Create3: { label: "xlabel" },
            EntityToDelete: { label: "deleteme" }
        },
        {
            Setup: (done) => {
                cmd.Create(pg.Author, { name: "test" }).then(r => {
                    let authorId = r.dataValues.id;
                    var exp = exports.TestEntities[2];
                    exp.CreateOfType = { authorId: authorId, content: "Here is some content", title: "title 1" };
                    exp.FetchCreateOfType = { authorId: authorId, content: "I just like typing things because it can be fun.", title: "another title" };
                    exp.UpdateCreateOfType = { authorId: authorId, content: "Sometimes I really enjoy typing things.", title: "title again" };
                    exp.Create1 = { authorId: authorId, content: "content 1", title: "title A" },
                        exp.Create2 = { authorId: authorId, content: "content 2", title: "title B" },
                        exp.Create3 = { authorId: authorId, content: "content 3", title: "title C" },
                        exp.EntityToDelete = { authorId: authorId, content: "This is bad content.  delete...", title: "Bad Title" }
                    done();
                });
            },
            name: "Post",
            type: pg.Post,
            CreateOfType: {},
            CreateProp: "content",
            FetchCreateOfType: {},
            UpdateCreateOfType: {},
            UpdateProp: "content",
            UpdateValue: "I changed my mind and now I have typing things.",
            Create1: {},
            Create2: {},
            Create3: {},
            EntityToDelete: {}
        },
        {
            Setup: (done) => {
                cmd.Create(pg.Author, { name: "betty" }).then(r1 => {
                    cmd.Create(pg.Post, { author: r1.dataValues.id, content: "some content", title: "A title" }).then(r2 => {
                        cmd.Create(pg.Topic, { label: "firstlabel" }).then(r3 => {
                            cmd.Create(pg.Topic, { label: "secondlabel" }).then(r4 => {
                                let postId = r2.dataValues.id;
                                let firstTopicId = r3.dataValues.id;
                                let secondTopicId = r4.dataValues.id;
                                var exp = exports.TestEntities[3];
                                exp.CreateOfType = { postId: postId, topicId: firstTopicId };
                                exp.FetchCreateOfType = { postId: postId, topicId: firstTopicId };
                                exp.UpdateCreateOfType = { postId: postId, topicId: firstTopicId };
                                exp.UpdateValue = secondTopicId;
                                exp.Create1 = { postId: postId, topicId: firstTopicId };
                                exp.Create2 = { postId: postId, topicId: firstTopicId };
                                exp.Create3 = { postId: postId, topicId: secondTopicId };
                                exp.EntityToDelete = { postId: postId, topicId: secondTopicId };
                                done();
                            })
                        })
                    })
                })
            },
            name: "PostTopic",
            type: pg.PostTopic,
            CreateOfType: {},
            CreateProp: "postId",
            FetchCreateOfType: {},
            UpdateCreateOfType: {},
            UpdateProp: "topicId",
            UpdateValue: {},
            Create1: {},
            Create2: {},
            Create3: {},
            EntityToDelete: {}
        },
        {
            Setup: (done) => {
                cmd.Create(pg.Author, { name: "drew" }).then(r1 => {
                    let blogAuthorId = r1.dataValues.id;
                    cmd.Create(pg.Post, { author: blogAuthorId, content: "drew's awesome content.", title: "drew's post" }).then(r2 => {
                        let blogPostId = r2.dataValues.id;
                        cmd.Create(pg.Author, { name: "pam" }).then(r3 => {
                            let commmenterId = r3.dataValues.id;
                            cmd.Create(pg.Comment, { author: commmenterId, post: blogPostId, level: 0, content: "this is great content!" }).then(r4 => {
                                let firstCommentId = r4.dataValues.id;
                                cmd.Create(pg.Comment, { author: blogAuthorId, post: blogPostId, level: 1, comment: firstCommentId, content: "thank you so much!" }).then(r5 => {
                                    let responseId = r5.dataValues.id;
                                    var exp = exports.TestEntities[4];
                                    exp.CreateOfType = { author: commmenterId, post: blogPostId, level: 0, content: "this is a comment." };
                                    exp.FetchCreateOfType = { author: commmenterId, post: blogPostId, level: 0, content: "this is another comment." };
                                    exp.UpdateCreateOfType = { author: blogAuthorId, post: blogPostId, level: 0, content: "this is something new." };
                                    exp.UpdateValue = "but this is even newer.";
                                    exp.Create1 = { author: commmenterId, post: blogPostId, level: 0, content: "comment 1." };
                                    exp.Create2 = { author: commmenterId, post: blogPostId, level: 0, content: "comment 2." };
                                    exp.Create3 = { author: blogAuthorId, post: blogPostId, level: 0, content: "comment 3." };
                                    exp.EntityToDelete = { author: blogAuthorId, post: blogPostId, comment: responseId, level: 2, content: "this is something new." };
                                    done();
                                })
                            })
                        })
                    })
                })
            },
            name: "Comment",
            type: pg.Comment,
            CreateOfType: {},
            CreateProp: "content",
            FetchCreateOfType: {},
            UpdateCreateOfType: {},
            UpdateProp: "content",
            UpdateValue: {},
            Create1: {},
            Create2: {},
            Create3: {},
            EntityToDelete: {}
        }
    ],
    BeforeEach: (done) => { Setup(done); },
    AfterEach: (done) => { cmd.Delete(pg.Comment).then(r => { cmd.Delete(pg.PostTopic).then(r0 => { cmd.Delete(pg.Post).then(r1 => { cmd.Delete(pg.Author); }).then(r2 => { cmd.Delete(pg.Topic).then(r3 => { done(); }); }); }); }); }
}