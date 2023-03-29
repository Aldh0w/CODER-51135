import { Router } from "express";
import productManager from '../controller/productManager.js'
const router = Router();
const products = productManager;




router.get('/', async (req, res)=>{
    const{ max } = req.query
    const allProducts = await products.getProduct();
    const productQuery = []
    if(!max){
        res.json(allProducts)        
    }else if(max > allProducts.length){
            res.json(allProducts)
    }else{
        for(let i=0; i<max; i++){
            productQuery.push(allProducts[i])
        }
        res.json(productQuery)
    }

})

router.get('/:id',async (req,res)=>{
    const { id } = req.params
    //console.log(id)
    const productId = await products.getProductById(id);
    //console.log(productId)
    if(!productId){
        res.send('El id del producto es inexistente');
    }

    res.json(productId)
})

router.post('/', async (req,res)=> {
    let producto = req.body
    const cargaProducto = await products.addProduct(producto)
    if(!cargaProducto){
        res.send('Carga invalida')
    }else{
        res.send('Producto cargado con éxito')
    }
})

router.put('/:id', async (req,res)=>{
    const { id } = req.params
    const data = req.body
    const productoModificar =  await products.updateProduct(id,data)
})

router.delete('/:id', async (req,res)=>{
    const { id } = req.params
    const productoBorrar = await products.deleteProduct(id)
})

export default router;




