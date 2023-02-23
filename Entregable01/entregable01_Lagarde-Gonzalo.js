class ProductManager{
    constructor(){
        this.products = []
    }

    getProduct(){
        console.log(this.products)
        return this.products
    }

    getProductById(id){
        const busqueda = this.products.find(dato => dato.id === id);
        if(!busqueda){
            throw new Error('Not found')
        }else{
            console.log(busqueda)
        }
    }

    addProduct(data){

        //Al Crear el producto se solicitan todos los datos, sino envia un error de datos invalidos
        if(!data.title && !data.description && !data.price && !data.thumbnail && !data.code && !data.stock){
            throw new Error('Debe ingresar todos los datos');
        }

        // Para saber si existe id, de lo contrario lo inicia en 1
        let id;
        if(this.products.length === 0){
            id = 1;
        }else{
            id = this.products[this.products.length -1].id + 1;

            //Comparamos si el code ya existe en los elementos que tiene el array, en caso de existir tira un error
            this.products.forEach(elemento =>{
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

        return this.products.push(newProduct)

    }
}
