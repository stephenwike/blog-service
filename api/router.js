'use strict';
module.exports = function (app) {
  var controller = require('./controller');

  app.route('/')
    .get(controller.get_posts);

  app.route('/posts')
    .get(controller.get_posts);

  app.route('/post/:id')
    .get(controller.get_post)
    .delete(controller.delete_post);

  app.route('/post/edit')
    .post(controller.add_post)
    .put(controller.change_post);

  app.route('/author')
    .get(controller.get_authors);

  app.route('/author/:id')
    .get(controller.get_author)
    .delete(controller.delete_author);

  app.route('/author/edit')
    .post(controller.add_author)
    .put(controller.change_author);
};