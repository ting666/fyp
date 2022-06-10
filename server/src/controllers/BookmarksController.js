const {
    Bookmark,
    Item
} = require('../models')
const _ = require('lodash')

module.exports = {   
    async index (req, res) {
        try{
            // const userId = req.user.id
            // const { itemId } = req.query
            // const where = {
            //     UserId: userId
            // }
            // if (itemId) {
            //     where.ItemId = itemId
            // }
            // const bookmarks = await Bookmark.findOne({
            //     where: where,
            //     include: [
            //         {
            //             model: Item
            //         }
            //     ]
            // })
            // .map(bookmark => bookmark.toJSON())
            // .map(bookmark => _.extend(
            //     {},
            //     bookmark.Item,
            //     bookmark
            // ))
            // res.send(bookmarks)

            const {itemId, userId} = req.query
            const bookmark = await Bookmark.findOne({
                wher: {
                    ItemId: itemId,
                    UserId: userId
                }
            })
            res.send(bookmark)

            // .map(bookmark => ({
            //     id: bookmark.id,
            //     itemId: bookmark.itemId,
            //     userId: bookmark.userId,
            //     createdAt: bookmark.createdAt,
            //     updatedAt: bookmark.updatedAt,
            //     owner: bookmark.item.owner,
            //     name: bookmark.item.name,
            //     category: bookmark.item.category,
            //     price: bookmark.item.price,
            //     quantity: bookmark.item.quantity,
            //     itemImageUrl: bookmark.item.itemImageUrl,
            //     description: bookmark.item.description
            // }))
            // res.status(200).json(bookmarks.reverse())

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
            // const {itemId, userId} = req.body
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
            
            const bookmarkId = req.params.bookmarkId
            console.log('bookmarkId', bookmarkId)
            // const bookmark = await Bookmark.findOne({
            //     where: {
            //         // id: bookmarkId,
            //         id: req.params.bookmarkId,
            //         UserId: userId              
            //     }
            // })
            const bookmark = await Bookmark.findByPk(bookmarkId)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete the bookmark'
            })
        }
    }
}