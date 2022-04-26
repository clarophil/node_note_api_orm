const db = require('../models/index');
const Note = db.Note;
const Category = db.Category;

exports.noteList = async function (req, res) {
    await Note.findAll({include: [Category]})
        .then(data => {
            console.log("All notes:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.noteCreate = async function (req, res) {
    let note = Note.build({ title: req.body.title, content: req.body.content, category: req.body.category})
    await note.save()
        .then(data => {
            console.log(note.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    // or note.create in one time
}

exports.noteUpdate = async function (req, res) {
    if (req.params.note_id > 0) {
        await Note.update(
            { title: req.body.title, content: req.body.content, category: req.body.category},
            { where: { note_id: req.params.note_id } }
        )
            .then(data => {
                if (data[0] == 0) {res.status(400).json({ message: 'Note not found' })} 
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Note not found' })
}

exports.noteDelete = async function (req, res) {
    if (req.params.note_id) {
        await Note.destroy({ where: { note_id: req.params.note_id } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Note not found' });
                else res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Note not found' })
}

exports.noteFindOne = async function (req, res) {
    if (req.params.note_id) {
        await Note.findOne({ where: { note_id: req.params.note_id }, include: [Category] })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Note not found' })
}

// const { Op } = require("sequelize");
exports.noteFindOp = async function (req, res) {
    let params = {}; 
    Object.entries(req.body).forEach(([key, value]) => { 
        params[key]  = value; 
    });
    await Note.findAll({ where: params  })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.noteOrder = async function (req, res) {
    await Note.findAll({ order: ['lastname'] })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

