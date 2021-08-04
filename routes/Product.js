const express = require('express');
const { createProduct, getSingleProduct, getAllProducts, getAllUserProducts, updateProduct, deleteProduct } = require('../controllers/Product');
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();
const upload = require('../middlewares/fileUpload');

//create a product
router.post('/', verifyToken, upload.single('image'), createProduct)

// get all products in the database
router.get('/products', getAllProducts)

//get specific product by a user
router.get('/:id', verifyToken, getSingleProduct)

//get all user products
router.get('/',verifyToken, getAllUserProducts)

//update a product
router.put('/update/:id', verifyToken, updateProduct);

//delete a product
router.delete('/delete/:id', verifyToken, deleteProduct);


module.exports = router;