const {
    sequelize,
    Item,
    User,
    Bookmark,
    History,
    Cart
} = require('../src/models')

const Promise = require('bluebird')
const items = require('./items.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
const histories = require('./histories.json')
const carts = require('./carts.json')

sequelize.sync({force: true})
 .then(async function () {
    await Promise.all(
        users.map(user => {
            User.create(user)
        })
    )

    await Promise.all(
        items.map(item => {
            Item.create(item)
        })
    )

    await Promise.all(
        bookmarks.map(bookmark => {
            Bookmark.create(bookmark)
        })
    )        

    await Promise.all(
        histories.map(history => {
            History.create(history)
        })
    )

    await Promise.all(
        carts.map(cart => {
            Cart.create(cart)
        })
    )
})
