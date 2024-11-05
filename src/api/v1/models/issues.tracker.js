const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Project = require('./project');

const Tracker = db.define('Tracker', {
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
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'project_id'
    },
}, {
    tableName: 'issues.tracker',
    timestamps: false
});
Tracker.belongsTo(Project, { foreignKey: 'projectId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Tracker;
