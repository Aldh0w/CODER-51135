import { Router } from "express";
import carrito from '../controller/cartManager.js'
const router = Router();
const cart = carrito;


router.post('/', async (req,res)=>{
    const nuevoCarro = await carrito.crearCarrito();
})

router.get('/:cid',async (req,res)=>{
    const { cid } = req.params
    const carritoId = await cart.getCartId(cid)

    res.send(carritoId)
})

router.post('/:cid/product/:pid', async(req,res)=>{
    const { cid,pid }= req.params
    const cantidad = req.body
    const carritoConProductos = await cart.addCart(cid, pid, cantidad);
    console.log(carritoConProductos)
    const carritoId = await cart.getCartId(cid)
    
    
    res.json(carritoId)

})

export default router