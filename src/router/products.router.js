const { Router, json, query } = require('express')
const { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer } = require('./../controllers/ProductController')
const ProductManager = require('./../helpers/ProductManager')
const router = Router()

// GET  /api/products[?:limit=N] 
router.get('/', getProductsFromServer )

// GET 	/api/products/:pid  
router.get('/:pid', getProductFromServer )

// POST /api/products
router.post('/', (req, res) => {
    const data = req.body
    const product = new ProductManager()
    console.log(data)
    product.addProduct(data).then( () => res.send(200, 'Product added')).catch(err => res.send(400, err))
    //res.send(200,'Product added' )
})

// PUT /api/products/:pid 
router.put('/:pid', (req, res) => {
    const product = new ProductManager()
    
    const id = parseInt(req.params.pid)
    const data = req.body

    product.updateProductById(id, data).then(res.send(200, 'Product has been updated.'))
} ) 

// DELETE /api/products/:pid
router.delete('/:pid', delProductOnServer)

module.exports = router