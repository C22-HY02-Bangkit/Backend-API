const express = require('express');
const { protect } = require('../middlewares');
const router = express.Router();
const {
    addPlanted,
    getPlanted,
    udpatePlanted,
} = require('../controllers/plantedController');
const {
    postDataValidate,
    updateDataValidate,
} = require('../utils/validator/plantedValidator');

router.get('/', (req, res) => {
    res.json({ msg: 'ok' });
});
router.get('/:id', protect, getPlanted);
router.post('/', protect, postDataValidate, addPlanted);
router.put('/:id', protect, updateDataValidate, udpatePlanted);

module.exports = router;
