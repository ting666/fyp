const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ItemsController = require('./controllers/ItemsController')

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
}
