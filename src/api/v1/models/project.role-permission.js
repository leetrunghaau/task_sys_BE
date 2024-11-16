const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const ProjectRole = require('./project.role');
const Permission = require('./project.permission');


const RolePermission = db.define('RolePermission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    }, roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id'
    }, permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'permission_id'
    }

}, {
    tableName: 'role-permission',
    timestamps: false
});
RolePermission.belongsTo(ProjectRole, { foreignKey: 'roleId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
RolePermission.belongsTo(Permission, { foreignKey: 'permissionId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = RolePermission;