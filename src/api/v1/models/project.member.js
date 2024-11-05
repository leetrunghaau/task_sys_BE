const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Project = require('./project');
const User = require('./user');

const Member = db.define('Member', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'project_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    }
}, {
    tableName: 'project.member',
    timestamps: false
});

Member.belongsTo(Project, { foreignKey: 'projectId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Member.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Member;
