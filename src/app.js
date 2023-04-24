const express = require('express')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')

const server = express()

server.listen(8080, () => console.log('Server Up'))

server.use(express.json())
server.use(express.urlencoded({extended : true}))

server.use('/', express.static('public'))

server.use('/api/products', productRouter)

//server.use('/products/:pid', productRouter)

server.use('/api/carts', cartRouter)