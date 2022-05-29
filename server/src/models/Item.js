module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        owner: DataTypes.STRING,
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        itemImageUrl: DataTypes.STRING,
        description: DataTypes.TEXT
    })

    return Item
}