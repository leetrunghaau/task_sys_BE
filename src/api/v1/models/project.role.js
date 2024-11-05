const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Project = require('./project');

const ProjectRole = db.define('ProjectRole', {
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
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'name'
    }
}, {
    tableName: 'project.role',
    timestamps: false
});

ProjectRole.belongsTo(Project, { foreignKey: 'projectId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = ProjectRole;
