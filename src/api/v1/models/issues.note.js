const { DataTypes } = require('sequelize');
const db = require('../../config/Database');
const Issues = require('./issues');

const Note = db.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    issuesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'issues_id'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'content'
    }
}, {
    tableName: 'issues.note',
    timestamps: false
});

Note.belongsTo(Issues, { foreignKey: 'issuesId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Note;
