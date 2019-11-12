
var orm = require('./orm/orm');

module.exports = function (app) {
  orm.GetConnection();

  app.route('/')
    .get(controller.get_posts);

  app.route('/post')
    .get(Handler(controller.get_posts))
    .post(controller.add_post)
    .put(controller.change_post)
    .delete(controller.delete_post);

  app.route('/post/:id')
    .get(controller.get_post);

  app.route('/author')
    .get(controller.get_authors)
    .post(controller.add_author)
    .put(controller.change_author)
    .delete(controller.delete_author);

  app.route('/author/:id')
    .get(controller.get_author)

  app.route('/topic')
    .get(controller.get_topics)
    .post(controller.add_topic)
    .put(controller.change_topic)
    .delete(controller.delete_topic);

  app.route('/topic/:id')
    .get(controller.get_topic)

  app.route('/posttopic')
    .get(controller.get_posttopics)
    .post(controller.add_posttopic)
    .put(controller.change_posttopic)
    .delete(controller.delete_posttopic);

  app.route('/posttopic/:id')
    .get(controller.get_posttopic)

  app.route('/comment')
    .get(controller.get_comments)
    .post(controller.add_comment)
    .put(controller.change_comment)
    .delete(controller.delete_comment);

  app.route('/comment/:id')
    .get(controller.get_comment)
};

function Handler(delg) {
  return (req, res) => { delg(); console.log("HERE WE ARE!"); console.log(req); }
} 

