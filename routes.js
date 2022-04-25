let express = require('express');
let router = express.Router();

// Import note controller
const noteController = require('./controllers/noteController');
const categoryController = require('./controllers/categoryController');

router.get('/', (req, res) => res.redirect('/note/list'));

router.get('/note/list', noteController.noteList);
router.post('/note', noteController.noteCreate);
router.put('/note/:note_id', noteController.noteUpdate);
router.delete('/note/:note_id', noteController.noteDelete);
router.get('/note/find/:note_id', noteController.noteFindOne);
router.post('/note/filter', noteController.noteFindOp);
// router.get('/note/order', noteController.noteOrder);


router.get('/category/list', categoryController.categoryList);
router.post('/category', categoryController.categoryCreate);
router.put('/category/:category_id', categoryController.categoryUpdate);
router.delete('/category/:category_id', categoryController.categoryDelete);
router.get('/category/find/:category_id', categoryController.categoryFindOne);
router.post('/category/filter', categoryController.categoryFindOp);

module.exports = router;