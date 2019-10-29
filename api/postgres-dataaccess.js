const orm = require('./orm-provider');
const sequelize = orm.Configure();
const { Post, Author } = orm.PopulateModel();
// const authenticate = orm.Authenticate();
// console.log(authenticate);
// const athird = orm.Authenticate();

module.exports = {
    // Posts
    GetAllPosts: async () => {
        return Post.findAll();
    },
    GetPostById: async (postId) => {
        return Post.findAll({ where: { id: postId } })
    },
    CreatePost: async (post) => {
        return CreateTransact(Post, post);
    },
    // Authors
    GetAllAuthors: async () => {
        return Author.findAll();
    },
    GetAuthorById: async (authorId) => {
        return Author.findAll({ where: { id: authorId } });
    },
    CreateAuthor: async (author) => {
        return CreateTransact(Author, author);
    },
    UpdateAuthor: async (author) => {
        return UpdateTransact(Author, author);
    }
    // Comments


    // Topics
}

function CreateTransact(type, obj) {
    obj.date = Date.now();
    return sequelize.transaction(t => {
        return type.create(
            obj,
            { transaction: t }).then(result => {
                return result;
            }).catch(err => {
                return err;
            });
    })
}

function UpdateTransact(type, obj) {
    return sequelize.transaction(t => {
        return type.update(
            obj,
            {
                where: {
                    id: obj.id
                },
                returning: {
                    obj
                }
            },
            { transaction: t }).then(result => {
                return result;
            }).catch(err => {
                return err;
            });
    });
}