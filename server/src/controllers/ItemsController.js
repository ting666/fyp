const {Item} = require('../models')
const { Op } = require('sequelize')

module.exports = {   
    async index (req, res) {
        try{
            let items = null
            const search = req.query.search
            if (search) {
                items = await Item.findAll({
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
                items = await Item.findAll({
                    limit: 20
                })
            }
            res.send(items)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the items'
            })
        }
    },
    async show (req, res) {
        try{
            const item = await Item.findByPk(req.params.itemId)
            res.send(item)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to show the items'
            })
        }
    },
    async post (req, res) {
        try{
            const item = await Item.create(req.body)
            res.send(item)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to create the items'
            })
        }
    },
    async put (req, res) {
        try{
            const item = await Item.update(req.body, {
                where: {
                    id: req.params.itemId
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
            const id = req.params.itemId;
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