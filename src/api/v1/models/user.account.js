const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const User = require('./user');

const Account = db.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    pass: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'pass'
    }
}, {
    tableName: 'user.account',
    timestamps: false
});

Account.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Account;
