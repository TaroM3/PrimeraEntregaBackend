const CartManager = require('./../helpers/CartManager')

// Get a cart from server
const getProductsCartFromServer = async (req, res) => {
    const carts = new CartManager()
    const id = parseInt(req.params.cid)
    carts.getCartById(id).then(cart => {
        if(cart !== undefined){
            
            res.send(200, cart)
        }else{
            res.status(400).send('Cart ' + id + ' does not exist')
        }
    })
    //res.send('GET one /carts')
}

// add o creates a cart to the server
const addCartOnServer = async (req, res) => {
    const carts = new CartManager()
    carts.addCart().then(res.status(200).send('A cart has been created'))
    //res.send('POST one /carts')
}

// add or update an existing product to an existing cart on the server
const addProductCartOnServer = async (req, res) => {
    res.send('POST one product on cart /carts')
}

module.exports = {getProductsCartFromServer, addCartOnServer, addProductCartOnServer}