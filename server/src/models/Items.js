module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        status: DataTypes.STRING,
        itemImageUrl: DataTypes.STRING,
        description: DataTypes.TEXT
    })

    return Item
}