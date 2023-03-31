import fs from 'fs';
import productManager from './productManager.js'
const product = productManager;

class Carrito{
    constructor(){
        this.idCart = 1
        this.products = []
    }
}



class CartManager{

    constructor(){
        this.nombreArchivo =`./src/cart.json`;
    }

    //Traemos el archivo en formato JSON para trabajar con el
    async obtenerJson(){
        const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
        return JSON.parse(data);
    }

    
    //Actualizamos modificaciones
    async actualizarArchivo(carrito){
        fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carrito, null, '\t'), 'utf-8');
    }
    
    async crearCarrito(){
        const newCarrito = new Carrito()
        const carrito = await this.obtenerJson();
        if(carrito.length === 0){
            carrito.push(newCarrito)
        }else{
            newCarrito.idCart = carrito[carrito.length -1].idCart + 1;
            carrito.push(newCarrito)
        }
        return await this.actualizarArchivo(carrito)
    }

    async getCartId(id){
        const carrito = []
      //Traemos los archivos en formato JSON para poder realizar la busqueda del ID
      const cart = await this.obtenerJson();
      //Buscamos si el ID existe, si no existe enviamos NOT FOUND, si existe mostramos cual es el producto
      const busqueda = cart.find(dato => dato.idCart === parseInt(id));
      if(!busqueda){
          throw new Error('Not found')
      }else{
        //carrito.push(busqueda)
        return(busqueda)
      }
    }


    async addCart(cid,pid,cantidad){

        if(!cid || !pid || !cantidad){
            throw new Error('Faltan ingresar datos')
        }

        if(cantidad<=0){
            throw new Error('La cantidad debe ser mayor que 0')
        }

        const cant = cantidad
        const carritoCompleto = await this.obtenerJson();
        const carritoId = await this.getCartId(cid)
        const index = carritoCompleto.findIndex((dato)=> dato.idCart === parseInt(cid))
        const busquedaIndex = carritoId.products.findIndex(dato => dato.productId === parseInt(pid));
        const busqueda = carritoId.products.find(dato => dato.productId === parseInt(pid));
        const productoCompleto = await product.getProductById(pid)
        const producto ={    
            productId: productoCompleto.id,    
            quantity: cant.cantidad
        }

        
        if(carritoId.length === 0){
            carritoCompleto[index].products.push(producto)

            return this.actualizarArchivo(carritoCompleto);   
        }else if(busqueda){
            producto.quantity = busqueda.quantity + producto.quantity
            carritoCompleto[index].products[busquedaIndex].quantity =producto.quantity
            return this.actualizarArchivo(carritoCompleto);  
            
        }else{
        carritoCompleto[index].products.push(producto)
        return this.actualizarArchivo(carritoCompleto);
        }
    }

}

const  cartManager = new CartManager()


export default cartManager
