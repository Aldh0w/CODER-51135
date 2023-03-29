// const fs = require('fs');
import express from 'express';
import productRoutes from './routes/products.routes.js'
import cartRoutes from  './routes/cart.routes.js'

const PORT = 8080;

const app = express();

app.use(express.json())
//Usamos esto para que nos funcio los req params
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)



app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`)
})




