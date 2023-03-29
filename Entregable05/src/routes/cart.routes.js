import { Router } from "express";
import carrito from '../controller/cartManager.js'
const router = Router();
const cart = carrito;


router.post('/', async (req,res)=>{
    const nuevoCarro = await carrito.crearCarrito();
})

router.get('/:cid',async (req,res)=>{
    const { cid } = req.params
    const carritoId = await carrito.getCartId(cid)

    res.send(carritoId)
})

export default router