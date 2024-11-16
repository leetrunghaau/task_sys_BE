const { DataTypes } = require('sequelize');
const db = require('../../config/Database');


const Permission = db.define('Permission', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description'
  },
  code: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'code'
  }
}, {
  tableName: 'permission',
  timestamps: false
});

module.exports = Permission;