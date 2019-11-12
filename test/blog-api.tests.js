var assert = require('assert');
var controller = require('../api/controller');

var post = {}
post.Create = async (post) => {
    if (post.authorId && post.content && post.title) return true;
    return false;
};

controller.SetORM({
    Domain: {
        Post: post
    }, Commands: {
        Create: (type, data) => {
            return type.Create(data);
        }
    }
});

describe('api controller', function () {

    it('should be able to create a new post given valid post object.', () => {
        var post = {
            authorId: 1,
            content: "blah",
            title: "title"
        }
        controller.create_post(post).then(result => {
            assert(result);
        });
    });

    it('will fail to create a new post if author is not provided.', () => {
        var post = {
            authorId: null,
            content: "blah",
            title: "title"
        }

        assert.throws(() => controller.create_post(post));
    });

    it('will fail to create a new post if content is empty.', () => {
        var post = {
            authorId: 1,
            content: "",
            title: "title"
        }

        assert.throws(() => controller.create_post(post));
    });

    it('will fail to create a new post if title is empty.', () => {
        var post = {
            authorId: 1,
            content: "blah",
            title: ""
        }

        assert.throws(() => controller.create_post(post));
    });
});