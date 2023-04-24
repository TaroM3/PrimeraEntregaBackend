const { Router } = require('express')
const {getProductsCartFromServer, addCartOnServer, addProductCartOnServer} = require('./../controllers/CartController')
const CartManager = require('../helpers/CartManager')
const ProductManager = require('../helpers/ProductManager')
const router = Router()

//POST /api/carts/ 
router.post('/', addCartOnServer)
// GET /api/carts/:cid 
router.get('/:cid', getProductsCartFromServer)


//POST /api/carts/:cid/product/:pid  
router.post('/:cid/product/:pid', (req, res) => {
    const carts = new CartManager()
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    const products = new ProductManager()
    carts.getCartById(cartId).then(cart => {
        
        if(cart !== undefined){

            products.getProductById(productId).then(product =>{
                //console.log(product)
                if(product !== undefined){
                    carts.addProductToCart(cartId, productId).then(res.status(200).send('Product ' + productId +' has been added to the cart ' + cartId))
                    
                }else{
                    res.status(400).send('Product ' + productId +' does not exist')
                }
            })
        }else{
            res.status(400).send('Cart ' + cartId + ' does not exist')
        }
    })
    
    /*console.log(product)
    if(product !== undefined){
    }*/
})

module.exports = router