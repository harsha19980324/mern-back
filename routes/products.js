const express = require('express');
const Products = require('../model/products');
var multer = require('multer')
var uniqid = require('uniqid')


const router = express.Router();

//save product
router.post('/product/save',(req,res) => {
    let newProduct = new Products(req.body);

    newProduct.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Product saved successful"
        });
    });

});


// get product
router.get('/products',(req,res) =>{
    Products.find().exec((err,products) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingProducts:products
        });
    });
});



//get a specific product
router.get("/product/:id",(req,res)=>{
    let productId = req.params.id;
    Products.findById(productId,(err,product)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            product
        });
    });
});



//update product
router.put('/product/update/:id',(req,res)=>{
    Products.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err,product)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    });
                }
                return res.status(200).json({
                    success:"updated successfully"
                });
            }
    );
});


//delete product
router.delete('/product/delete/:id',(req,res) =>{
    Products.findByIdAndRemove(req.params.id).exec((err,deletedProduct) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedProduct
        });
    });
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

//upload image product
router.post('/product/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})



module.exports = router;