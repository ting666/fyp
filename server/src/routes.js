const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ItemsController = require('./controllers/ItemsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {   
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/login', 
        AuthenticationController.login)

    app.get('/items', 
        ItemsController.index)
    app.get('/items/:itemId', 
        ItemsController.show)
    app.put('/items/:itemId', 
        ItemsController.put)
    app.post('/items', 
        ItemsController.post)

    app.get('/bookmarks',
        isAuthenticated,
        BookmarksController.index)
    app.post('/bookmarks',
        isAuthenticated,
        BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId',
        isAuthenticated,
        BookmarksController.remove)

    app.get('/histories',
        isAuthenticated,
        HistoriesController.index)
    app.post('/histories',
        isAuthenticated,
        HistoriesController.post)
}
