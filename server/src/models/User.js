const { hash } = require('bcrypt');
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

async function hashPassword (user) {
    const SALT_FACTOR = 8;

    if (!user.changed('password')) {
        return null;
    }

    const hash = bcrypt.hashSync(user.password, SALT_FACTOR) 
    user.setDataValue('password', hash);

    return null;
}
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
            // beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User
}