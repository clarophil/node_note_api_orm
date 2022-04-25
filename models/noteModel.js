const Sequelize = require('sequelize')
const db = require('../db.js')

const Note = db.define('note', {
    note_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Note