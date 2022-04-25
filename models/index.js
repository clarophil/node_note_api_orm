const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Category = require('./categoryModel');
db.Note = require('./noteModel');

db.Note.belongsTo( db.Category, {foreignKey: "category_id"} );
db.Category.hasMany(db.Note, { foreignKey: "category_id" });

module.exports = db