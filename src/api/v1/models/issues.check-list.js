const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Issues = require('./issues');

const CheckList = db.define('CheckList', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    checked: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        field: 'checked'
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'name'
    },
    issuesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'issues_id'
    }
}, {
    tableName: 'issues.check-list',
    timestamps: false
});

CheckList.belongsTo(Issues, { foreignKey: 'issuesId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = CheckList;
