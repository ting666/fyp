module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {})

    Cart.associate = function (models) {
        Cart.belongsTo(models.User)
        Cart.belongsTo(models.Item)
    }

    return Cart
}