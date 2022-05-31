const {
    Cart,
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
            const carts = await Cart.findAll({
                where: where,
                include: [
                    {
                        model: Item
                    }
                ]
            })
            .map(cart => cart.toJSON())
            .map(cart => _.extend(
                {},
                cart.Item,
                cart
            ))
            res.send(carts)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the cart'
            })
        }
    },
    async post (req, res) {
        try{
            const userId = req.user.id
            const {itemId} = req.body
            // const cart = await Cart.findOne({
            //     where: {
            //         ItemId: itemId,
            //         UserId: userId
            //     }
            // })
            // if (cart) {
            //     return res.status(400).send({
            //         error: 'you already have this set as a cart'
            //     })
            // }
            const cart = await Cart.create({
                ItemId: itemId,
                UserId: userId
            })
            res.send(cart)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'an error has occured trying to fetch the cart'
            })
        }
    },
    async remove (req, res) {
        try{
            const userId = req.user.id
            const {cartId} = req.params
            const cart = await Cart.findOne({
                where: {
                    id: cartId,
                    UserId: userId
                }
            })
            if (!cart) {
                return res.status(403).send({
                    error: 'you do not have access to this cart'
                })
            }
            await cart.destroy()
            res.send(cart)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete the cart'
            })
        }
    }
}