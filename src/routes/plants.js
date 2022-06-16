const express = require('express');
const { protect } = require('../middlewares');
const router = express.Router();

const { getPlants, getPlant } = require('../controllers/plantsController');

router.get('/', protect, getPlants);
router.get('/:id', protect, getPlant);

module.exports = router;
