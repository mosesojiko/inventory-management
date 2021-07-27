const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/Product')
const router = express.Router();

router.post('/', createProduct)
router.put('/update', updateProduct)
router.delete('/delete', deleteProduct)

module.exports = router;