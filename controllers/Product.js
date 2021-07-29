
const Products = require('../models/Product');


//create a product
const createProduct = async (req, res) =>{

    //check if there is a product with numberInStock 
    const checkNumberInStock = await User.findOne({numberInStock: req.body.numberInStock})
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
        url: req.body.url,
        user: req.user._id
        
    })   
        const saveProduct = await product.save();
        res.json({
            status: 200,
            success: true,
            saveProduct
        })
        console.log(saveProduct)

   } catch (error) {
       res.send(error)
   }

}

//get single product by a users
const getSingleProduct = async (req, res) =>{
    try{
        let products = await Products.findOne({user: req.user._id, _id:req.params.id});
       if(products) {
        res.json(products)
       }else{
           res.send("Product not found")
       }
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
}

//get all products by a user
const getAllProducts = async (req, res) =>{
    try {
      let allUserProducts =  await Products.find({user: req.user._id})
      res.json({
          message: "List of your product.",
          allUserProducts
       
    })

    } catch (error) {
        res.send(error)
    }

}


// update a user product
const updateProduct = async (req , res) => {
try {
    let productToUpdate = await Products.findOneAndUpdate({user: req.user._id, _id: req.params.id},
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
const productToDelete =  await Product.findOneAndDelete({user: req.user._id, _id: req.params.id})
if (!productToDelete) return res.status(400).json({ success: false , msg: `product not found`})
res.status(200).json({
    success: true , 
    msg: "Product was deleted successfully." 
})
} catch (error) {
    res.status(400).json({
        msg: error , 
    })
}
}


module.exports = { createProduct, getSingleProduct, getAllProducts, updateProduct, deleteProduct }