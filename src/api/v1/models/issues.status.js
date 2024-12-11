const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Project = require('./project');

const Status = db.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
    tableName: 'issues.status',
    timestamps: false
});
Status.belongsTo(Project, { foreignKey: 'projectId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Status;
