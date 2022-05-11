const {
    History,
    Item,
    User
} = require('../models')
const _ = require('lodash')

module.exports = {   
    async index (req, res) {
        try{
            const userId = req.user.id
            const histories = await History.findAll({
                where: {
                    UserId: userId
                },
                include: [
                    {
                        model: Item
                    }
                ]
            })
            .map(history => history.toJSON())
            .map(history => _.extend(
                {},
                history.Item,
                history
            ))
            res.send(_.uniqBy(histories, history => history.ItemId))
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the history'
            })
        }
    },
    async post (req, res) {
        try{
            const userId = req.user.id
            const {itemId} = req.body
            const history = await History.create({
                ItemId: itemId,
                UserId: userId
            })
            res.send(history)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the history object'
            })
        }
    }
}