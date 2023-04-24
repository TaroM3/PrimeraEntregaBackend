const ProductManager = require('./../helpers/ProductManager')
let info = {}


const getAllProductsFromServer = async () => {
    
}

const getNProductsFromServer = async () => {
    
}

// Get all or N products from server /api/products[?:limit=N]
const getProductsFromServer = async (req, res) => {
    let arrayQuery = Object.keys(req.query)

    if(!(arrayQuery.length > 0)){
        const products = new ProductManager()
        const listProducts = await products.getAllProducts()

        if(Array.isArray(listProducts)){
            const length = listProducts.length

            if(length > 0){
                info = {
                    status: "success",
                    data: listProducts,
                    length: length,
                    message: "products returned successfully"
                }
                return res.status(400).json(info)
            }

            info ={
                status: "error",
                data: [],
                length: 0,
                message: "no products"
            }
            return res.status(400).json(info)
        }
    }

    if(arrayQuery.length > 0){
        if(!arrayQuery.includes('limit') || arrayQuery.length > 1 ){
            info = { 
                status: "error",
                message: "query with syntax error",
                data: [],
                length: 0
            }
            return res.status(400).json(info)
        }

        let {limit} = req.query
        limit = parseInt(limit)

        if(!isNaN(limit) && limit > 0){
            const products = new ProductManager()
            
            const listProducts = await products.getProducts(limit)

            if(Array.isArray(listProducts)){
                const length = listProducts.length

                if(length > 0){
                    info = {
                        status: length === limit ? "success" : "partial",
                        data: listProducts,
                        length: length,
                        message: length === limit? "products returned successfully" : "Not all the requested products were available."
                    }
                    return res.status(400).json(info)
                }

                info ={
                    status: "error",
                    data: [],
                    length: 0,
                    message: "no products"
                }
                return res.status(400).json(info)
            }

            info = { 
                status: "error",
                data: [],
                length: 0,
                message: "the argument of limit is not a positive integer",
                
            }
            return res.status(200).json(info)
        }
    }

    

}

// Get a product from server /api/products/:pid 
const getProductFromServer = async (req, res) => {
    const products = new ProductManager()
    let id = parseInt(req.params.pid)
    console.log(id)
    const product = await products.getProductById(id)
    console.log(product)
    if(product !== undefined){

        //if(length > 0){
            info = {
                status: "success",
                data: product,
                length: 1,
                message: "products returned successfully"
            }
            return res.status(200).json(info)
        }

        info ={
            status: "error",
            data: [],
            length: 0,
            message: "no products"
        }
        return res.status(400).json(info)
    

//    res.send('GET one of /products' + product)
}

// Add a product to the server
const addProductOnServer = async (req, res) => {
}

// Update a product to the server
const updProductOnServer = async (req, res) => {
    res.send('PUT one of /products')
}

// Delete a product to the server
const delProductOnServer = async (req, res) => {
    const product = new ProductManager()
    const id = parseInt(req.params.pid)
    product.deleteProductById(id).then(res.send(200, 'success'))
}

module.exports = {getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer}
