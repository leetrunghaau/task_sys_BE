const { DataTypes } = require('sequelize');
const db = require('../../config/Database');

const Project = db.define('Project', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'description'
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id'
    },
    public: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        field: 'public'
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        field: 'active'
    },created: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created'
    }
}, {
    tableName: 'project',
    timestamps: false
});
Project.hasMany(Project, {as: 'Chillrend', foreignKey: 'parentId', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Project;
