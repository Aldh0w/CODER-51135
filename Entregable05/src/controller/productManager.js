import fs from 'fs';

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
        const busqueda = productos.find(dato => dato.id === parseInt(id));
        if(!busqueda){
            throw new Error('Not found')
        }else{
            /*console.log(`El producto con id ${id} es:`);
            console.log(busqueda)*/
            return(busqueda)
        }
    }

    //Agregar un nuevo producto
    async addProduct(data){
        //Al Crear el producto se solicitan todos los datos, sino envia un error de datos invalidos
        if(!data.title          || typeof data.title !== 'string' 
        || !data.description    || typeof data.description !== 'string' 
        || !data.price          || typeof data.price !== 'number'  
        || !data.code           || typeof data.code !== 'string' 
        || !data.stock          || typeof data.stock !== 'number'
        || !data.status         || typeof data.status !== 'boolean'
        || !data.category       || typeof data.category !== 'string'){
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
            stock:       data.stock,
            status:      true,
            category:    data.category
        }

        productos.push(newProduct)
        console.log(`se agrego ${newProduct.title} a ${this.nombreArchivo}`);
        return await this.actualizarArchivo(productos);
    }

    //Borrar producto por ID
    async deleteProduct(id){
        const productos = await this.obtenerJson();
        const busqueda = productos.find(dato => dato.id === parseInt(id));
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
        const busqueda = productos.find(dato => dato.id === parseInt(id))
        const index = productos.findIndex((dato)=> dato.id === parseInt(id))
        if(!busqueda){
            throw new Error('Not found')
        }

        let productoModificado = {
            id:             parseInt(id),
            title:          !data.title ? busqueda.title : data.title,
            description:    !data.description ? busqueda.description : data.description,
            price:          !data.price ? busqueda.price : data.price,
            thumbnail:      !data.thumbnail ? busqueda.thumbnail : data.thumbnail,
            code:           !data.code ? busqueda.code : data.code,
            stock:          !data.stock ? busqueda.stock : data.stock,
            status:         true,
            category:       !data.category ? busqueda.category : data.category

        }

        if( index !== -1){
            productos[index] = productoModificado
            return await this.actualizarArchivo(productos);
        }else{
            throw new Error('Not found')
        }
    }

}
const productos = new ProductManager('productos')


export default productos;