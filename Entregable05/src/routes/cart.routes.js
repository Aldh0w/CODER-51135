import { Router } from "express";
import carrito from '../controller/cartManager.js'
const router = Router();
const cart = carrito;


router.post('/',(req,res)=>{
    const nuevoCarro = carrito.crearCarrito();
})


export default router