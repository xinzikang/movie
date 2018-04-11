module.exports = function(app) {
  app.use('/users', require('./detail-router/users'));
  app.use('/movies', require('./detail-router/movies'));
  app.use('/admin', require('./detail-router/admin'));
  app.use('/comment', require('./detail-router/comment'));
  app.use('/category', require('./detail-router/category'));
}