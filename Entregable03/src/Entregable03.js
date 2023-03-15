// const fs = require('fs');
import fs from 'fs';
import express from 'express';

const PORT = 8080;

const app = express();

app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`)
})


class ProductManager{
    constructor(nombreArchivo){
        this.nombreArchivo =`./src/${nombreArchivo}.json`; 
        if(!fs.existsSync(this.nombreArchivo)) fs.promises.writeFile(this.nombreArchivo, '' , 'utf-8');
    }


    //Traemos el archivo en formato JSON para trabajar con el
    async obtenerJson(){
        
        const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
        return JSON.parse(data);
    }

    //Actualizamos modificaciones
    async actualizarArchivo(productos){
        fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'), 'utf-8');
    }

    //Traemos todos los productos que existen
    async getProduct(){
        const data = await this.obtenerJson();
        return data
    }

    //Traemos el Producto con la ID 
    async getProductById(id){
        //Traemos los archivos en formato JSON para poder realizar la busqueda del ID
        const productos = await this.obtenerJson();

        //Buscamos si el ID existe, si no existe enviamos NOT FOUND, si existe mostramos cual es el producto
        const busqueda = productos.find(dato => dato.id === id);
        if(!busqueda){
            throw new Error('Not found')
        }else{
            console.log(`El producto con id ${id} es:`);
            console.log(busqueda)
        }
    }

    //Agregar un nuevo producto
    async addProduct(data){
        //Al Crear el producto se solicitan todos los datos, sino envia un error de datos invalidos
        if(!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock){
            throw new Error('Debe ingresar todos los datos');
        }
        const productos =   await this.obtenerJson();
        // Para saber si existe id, de lo contrario lo inicia en 1
        let id;
        if(productos.length === 0){
            id = 1;
        }else{
            id = productos[productos.length -1].id + 1;

            //Comparamos si el code ya existe en los elementos que tiene el array, en caso de existir tira un error
            productos.forEach(elemento =>{
                if(elemento.code === data.code){
                    throw new Error('El Code ya existe.')
                }
            })
        }

        const newProduct = {
            id:          id,
            title:       data.title,
            description: data.description,
            price:       data.price,
            thumbnail:   data.thumbnail,
            code:        data.code,
            stock:       data.stock
        }

        productos.push(newProduct)
        console.log(`se agrego ${newProduct.title} a ${this.nombreArchivo}`);
        return await this.actualizarArchivo(productos);
    }

    //Borrar producto por ID
    async deleteProduct(id){
        const productos = await this.obtenerJson();
        const busqueda = productos.find(dato => dato.id === id);
        if(!busqueda){
            throw new Error('Not found')
        }else{
            productos.splice(id - 1,1);
            console.log(`Se removio el producto con id:${id} de sus productos`);
            return await this.actualizarArchivo(productos);
        }
    }

    async updateProduct(id,data){
        const productos = await this.obtenerJson();
        const busqueda = productos.find(dato => dato.id === id);
        const index = productos.findIndex((dato)=> dato.id === id)
        if(!busqueda){
            throw new Error('Not found')
        }

        let productoModificado = {
            id:             id,
            title:          !data.title ? busqueda.title : data.title,
            description:    !data.description ? busqueda.description : data.description,
            price:          !data.price ? busqueda.price : data.price,
            thumbnail:      !data.thumbnail ? busqueda.thumbnail : data.thumbnail,
            code:           !data.code ? busqueda.code : data.code,
            stock:          !data.stock ? busqueda.stock : data.stock

        }

        if( index !== -1){
            productos[index] = productoModificado
            return await this.actualizarArchivo(productos);
        }else{
            throw new Error('Not found')
        }
    }

}

/*const main = async() =>{
    
    const productos = new ProductManager('productos')
    console.log("1_ Traer todos los productos");
    const getAll = await productos.getProduct();
    console.log(getAll);
    console.log("--------------------------------------");
    console.log("2_ Agregar producto");
    const agregarProducto = await productos.addProduct(
        {
            title:       'title01',
            description: 'description01',
            price:       1200,
            thumbnail:   'thumbnail prueba',
            code:        111111,
            stock:       25
        }
    )
    console.log("--------------------------------------");
    console.log("3_ Buscar producto por id");
    const buscarId = await productos.getProductById(1);
    console.log("--------------------------------------");
    console.log("4_ Borrar producto por id");
    const borrarId = await productos.deleteProduct(1);
    console.log("--------------------------------------");
    console.log("6_ Mostramos los productos despues de borrar el 1.");
    const getAll2 = await productos.getProduct();
    console.log(getAll2);
    console.log("--------------------------------------");
    console.log("7_ Modificamos el producto 2")
    const modificar = await productos.updateProduct(2,
    {
        title: 'Modifico el titulo'
    })
    console.log("--------------------------------------");
    console.log("Muestro el producto modificado");
    const getAll3 = await productos.getProduct();
}

main()
*/