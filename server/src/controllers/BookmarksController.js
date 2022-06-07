const {
    Bookmark,
    Item
} = require('../models')
const _ = require('lodash')

module.exports = {   
    async index (req, res) {
        try{
            const userId = req.user.id
            const {itemId} = req.query
            const where = {
                UserId: userId
            }
            if (itemId) {
                where.ItemId = itemId
            }
            const bookmarks = await Bookmark.findAll({
                where: where,
                include: [
                    {
                        model: Item
                    }
                ]
            })
            .map(bookmark => bookmark.toJSON())
            .map(bookmark => _.extend(
                {},
                bookmark.Item,
                bookmark
            ))
            res.send(bookmarks)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the bookmark'
            })
        }
    },
    async post (req, res) {
        try{
            const userId = req.user.id
            const {itemId} = req.body
            const bookmark = await Bookmark.findOne({
                where: {
                    ItemId: itemId,
                    UserId: userId
                }
            })
            if (bookmark) {
                return res.status(400).send({
                    error: 'you already have this set as a bookmark'
                })
            }
            const newBookmark = await Bookmark.create({
                ItemId: itemId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'an error has occured trying to fetch the bookmark'
            })
        }
    },
    async delete (req, res) {
        try{
            // const userId = req.user.id
            // const {bookmarkId} = req.params
            // const bookmark = await Bookmark.findOne({
            //     where: {
            //         id: bookmarkId,
            //         UserId: userId
            //     }
            // })
            // if (!bookmark) {
            //     return res.status(403).send({
            //         error: 'you do not have access to this bookmark'
            //     })
            // }
            // await bookmark.destroy()
            // res.send(bookmark)

            const userId = req.user.id
            const {id} = req.params.bookmark.id;
            await Bookmark.destroy({
                where: {
                    BookmarkId: id,
                    UserId: userId
                }
            })
            res.send(id)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete the bookmark'
            })
        }
    }
}