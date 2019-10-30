const pg = require('../api/postgres-dataaccess');
const cmd = require('../api/orm-commands');

var exports = module.exports = {
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
            EntityToDelete: { name: "robert" },
            TearDown: (done) => { cmd.Delete(pg.Author, "").then(r1 => { done(); }); }
        },
        {
            Setup: () => { },
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
            EntityToDelete: { label: "deleteme" },
            TearDown: (done) => { cmd.Delete(pg.Topic).then(r1 => { done(); }); }
        },
        {
            Setup: (done) => {
                let authorId;
                cmd.Create(pg.Author, { name: "test"}).then(r => { 
                    var authorId = r.dataValues.id; 
                    var exp = exports.TestEntities[2];
                    exp.CreateOfType = { author: authorId, content: "Here is some content" };
                    exp.FetchCreateOfType = { author: authorId, content: "I just like typing things because it can be fun." };
                    exp.UpdateCreateOfType = { author: authorId, conent: "Sometimes I really enjoy typing things." };
                    done();
                });
            },
            name: "Post",
            type: pg.Post,
            CreateOfType: { },
            CreateProp: "content",
            FetchCreateOfType: { },
            UpdateCreateOfType: { },
            UpdateProp: "content",
            UpdateValue: "I changed my mind and now I have typing things.",
            Create1: { author: 1, content: "content 1" },
            Create2: { author: 1, content: "content 2" },
            Create3: { author: 1, content: "content 3" },
            EntityToDelete: { author: 1, content: "This is bad content.  delete..." },
            TearDown: (done) => { cmd.Delete(pg.Post).then(r => { done(); }); }
        },
        // {
        //     name: "PostTopic",
        //     type: pg.PostTopic,
        //     CreateOfType: { postid: 1, topicid: 1 },
        //     CreateProp: "topicid",
        //     FetchCreateOfType: { postid: 1, topicid: 1 },
        //     UpdateCreateOfType: { postid: 1, topicid: 1 },
        //     UpdateProp: "topicid",
        //     UpdateValue: { postid: 1, topicid: 2 },
        //     Create1: { postid: 1, topicid: 1 },
        //     Create2: { postid: 1, topicid: 1 },
        //     Create3: { postid: 1, topicid: 1 },
        //     EntityToDelete: { postid: 1, topicid: 1 }
        // }
    ],
    TearDown: (done) => { cmd.Delete(pg.Post).then(r1 => { cmd.Delete(pg.Author); }).then(r2 => { done(); }); }
}