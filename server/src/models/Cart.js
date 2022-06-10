module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        user: DataTypes.STRING,
        owner: DataTypes.STRING,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        itemImageUrl: DataTypes.STRING,
        state: DataTypes.STRING
    })

    return Cart

    // Cart.associate = function (models) {
    //     Cart.belongsTo(models.User)
    //     Cart.belongsTo(models.Item)
    // }

    return Cart
}