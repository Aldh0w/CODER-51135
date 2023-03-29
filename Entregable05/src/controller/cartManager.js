import fs from 'fs';

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
        //Traemos los archivos en formato JSON para poder realizar la busqueda del ID
        const cart = await this.obtenerJson();
        //Buscamos si el ID existe, si no existe enviamos NOT FOUND, si existe mostramos cual es el producto
        const busqueda = cart.find(dato => dato.idCart === parseInt(id));
        if(!busqueda){
            throw new Error('Not found')
        }else{
            return(busqueda.products)
        }
    }

}

const  cartManager = new CartManager()


export default cartManager
