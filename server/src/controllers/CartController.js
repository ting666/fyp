// const {
//     Cart,
//     Item
// } = require('../models')
// const _ = require('lodash')

const {Cart} = require('../models')
const { Op } = require('sequelize')

module.exports = {   
    async index (req, res) {
        try{
            let carts = null
            const search = req.query.search
            if (search) {
                carts = await Cart.findAll({
                    where: {
                        [Op.or]: [
                            'name'
                        ].map(key => ({
                            [key]: {
                                [Op.like]: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                carts = await Cart.findAll({
                    limit: 20
                })
            }
            res.send(carts)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the items'
            })
        }
    },
    async show (req, res) {
        try{
            const cart = await Cart.findByPk(req.params.itemId)
            res.send(cart)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to show the items'
            })
        }
    },
    async post (req, res) {
        try{
            const cart = await Cart.create(req.query)
            res.send(cart)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to create the items'
            })
        }
    },
    async put (req, res) {
        try{
            const cart = await Cart.update(req.body, {
                where: {
                    id: req.params.cartId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to update the items'
            })
        }
    },
    async delete (req, res) {
        try{
            const id = req.params.cartId;
            await Item.destroy({
                where: {id: id}
            })
            res.send(id)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete the items'
            })
        }
        
    }
}