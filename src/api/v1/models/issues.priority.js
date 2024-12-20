const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Project = require('./project');

const Priority = db.define('Priority', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'name'
    },
    color: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'color'
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'project_id'
    },
}, {
    tableName: 'issues.priority',
    timestamps: false
});
Priority.belongsTo(Project, { foreignKey: 'projectId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Priority;
