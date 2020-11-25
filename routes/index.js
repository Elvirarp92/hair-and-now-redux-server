module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/users', require('./users.routes.js'))
    app.use('/salons', require('./salons.routes.js'))

}