const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Issues = require('./issues');
const User = require('./user');

const Comment = db.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'value'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id'
    },
    issuesId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'issues_id'
    },
    created: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created'
        
    },
}, {
    tableName: 'issues.comment',
    timestamps: false
});

Comment.belongsTo(Issues, { foreignKey: 'issuesId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.hasMany(Comment, {as: 'Chillrend', foreignKey: 'parentId', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Comment;
