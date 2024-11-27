const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Priority = require('./issues.priority');
const Status = require('./issues.status');
const Tracker = require('./issues.tracker');
const Project = require('./project');
const User = require('./user');

const Issues = db.define('Issues', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'name'
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'status_id'
    },
    trackerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'tracker_id'
    },
    priorityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'priority_id'
    },
    assignee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'assignee'
    },
    createBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'create_by'
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created'
    },
    start: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'start'
    },
    end: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'end'
    },
    updated: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated'
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'progress'
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id'
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'project_id'
    }
    
}, {
    tableName: 'issues',
    timestamps: false
});

Issues.belongsTo(Priority, { foreignKey: 'priorityId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Issues.belongsTo(Status, { foreignKey: 'statusId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Issues.belongsTo(Tracker, { foreignKey: 'trackerId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Issues.belongsTo(Project, { foreignKey: 'projectId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Issues.belongsTo(User, { as: "Assignee", foreignKey: 'assignee', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Issues.belongsTo(User, { as: "Owner", foreignKey: 'createBy', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Issues.hasMany(Issues, {as: 'Chillrend', foreignKey: 'parentId', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Issues;
