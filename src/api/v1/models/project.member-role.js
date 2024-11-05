const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Member = require('./project.member');
const Role = require('./project.role');

const MemberRole = db.define('MemberRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'member_id'
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id'
    }
}, {
    tableName: 'project.member-role',
    timestamps: false
});

MemberRole.belongsTo(Member, { foreignKey: 'memberId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
MemberRole.belongsTo(Role, { foreignKey: 'roleId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = MemberRole;
