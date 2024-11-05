const { DataTypes } = require('sequelize');
const db = require('../../config/Database');


const User = db.define('User', {
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
  userName: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'user_name'
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'email'
  },
  gender: DataTypes.STRING(7),
  created: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  modified:{
    type: DataTypes.DATE,
    field:'modified_at'
  },
  admin: {
    type: DataTypes.BOOLEAN,
    field:'admin'
  },
  verified: DataTypes.DATE,
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;