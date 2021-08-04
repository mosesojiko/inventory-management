
const Products = require('../models/Product');


//create a product
const createProduct = async (req, res) =>{

    //check if there is a product with the same numberInStock 
    //We want a unique number for every products in the store
    const checkNumberInStock = await Products.findOne({numberInStock: req.body.numberInStock})
    if(checkNumberInStock){
        return res.status(400).send("NumberInStock already exist.")
    }
    //create a user based on user schema
   try {
    let product = new Products({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
        image: `http://localhost:5000/products/image/${req.file.filename}`,
        url: req.body.url,
        user: req.user._id
        
    })   
        const saveProduct = await product.save();
        res.json({
            status: 200,
            success: true,
            saveProduct
        })
      

   } catch (error) {
       res.json({
           status: 500,
           message: error.message
       })
   }

}

//get all products
const getAllProducts = async (req, res) =>{
    try {
        let allProducts = await Products.find({});
    if(allProducts.length === 0){
        return res.json({
            status: 200,
            message: "There are no products in the database. You may consider creating products first."
        })
    }else{
        return res.json({
            status: 201,
            allProducts
        })
    }

    } catch (error) {
        res.json({
            status: 500,
            error: error.message
        })
        
    }
}

//get single product by a users
const getSingleProduct = async (req, res) =>{
    try{
        let products = await Products.findOne({user: req.user._id, _id:req.params.id});
       if(products) {
        res.json(products)
       }else{
           res.send("Product not found.")
       }
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}

//get all products by a user
const getAllUserProducts = async (req, res) =>{
    let userid =  req.user._id
    try {
     let allUserProducts =  await Products.find({user:userid})


      //If the user has not created any product
      if(!allUserProducts){
          return res.send("You have not created any product yet")
      }else{
        return res.json({
            message: "Checkout the list of your product(s) as follows.",
            allUserProducts
        })
      }
      

    } catch (error) {
       res.status(400).json({
           error: error.message
       })
    }

}


// update a user product
const updateProduct = async (req , res) => {
    //You cannot update a product with the same numberInStock
    //Product numberInStock is unique for all products

    const checkNumberInStock = await Products.findOne({numberInStock: req.body.numberInStock})
    if(checkNumberInStock){
        return res.status(400).send("NumberInStock already exist.")
    }
    
try {
    //try and update a product
    let productToUpdate = await Products.findOneAndUpdate({user: req.user._id, _id: req.params.id,},
            {...req.body} , {new: true})

        if (!productToUpdate) return res.status(400).json({ msg: `product not found`})
        let updatedProduct = await productToUpdate.save()

        res.status(200).json({
             updatedProduct
        })
} catch (err) {
        res.status(400).send(err)
    }

}

//Delete a product
const deleteProduct = async (req , res) => {
try {
    await Products.findOneAndDelete({_id: req.params.id,user: req.user._id });
    res.send("Product deleted successfully")
} catch (error) {
    res.status(400).json({
        msg: error.message 
    })
}
}


module.exports = { 
    createProduct,
    getAllProducts, 
    getSingleProduct, 
    getAllUserProducts, 
    updateProduct, 
    deleteProduct 
}