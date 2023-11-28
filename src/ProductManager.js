import fs from 'fs';
// const fs = require('fs');

class ProductManager{
    constructor(path){
        this.products = [];
        this.incrementId = 1;
        this.path = path;
    }

    //Para guardar los productos en archivo.
    guardarArchivo(){
        const data = JSON.stringify(this.products);
        fs.writeFileSync(this.path, data);
    }

    // Para cargar los productos del archivo
    cargarArchivo(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            //console.log(data);
            
            this.products = JSON.parse(data);
        } 
        catch (error) {
            // Si error, inicializamos products como un array vacío
            this.products = [];
            console.log("error el abrir el archivo");
        }
    }

    addProduct( product ){
        /*Compruebo que todas las propiedades sean obligatorias al momento de ingresar el producto */
        if( product.title && product.description &&product.price &&product.code &&product.stock){
            /*Valido si el code del product no exista*/
            if (this.products.some((p) => p.code === product.code)) {
                console.log("El codigo del producto ya existe.");
                return -1;
            } else{

                //Si el codigo no existe agrego el producto al array
                this.cargarArchivo();
                product.id = this.incrementId++;
                this.products.push(product);
                //Se guarda el producto
                this.guardarArchivo();
                console.log("Se ingreso ok");
                return product.id;
            }
        }else{
            console.log("Faltaron parametros para crear el producto")
        }
    }

    /*Metodo para devolver todos los productos en un array*/
    getProducts() {
        this.cargarArchivo();
        return this.products;
    }

    /*Metodo para devolver un solo producto segun Id*/
    getProductById(id) {
        this.cargarArchivo();

        id = parseInt(id);

        const product = this.products.find((p) => p.id === id);
        
        if (product) {
          return product;
        } else {
          console.log("Product Not Found");
        }
    }

    // Metodo para actualizar el id y el archivo
    updateProduct(id, nuevosValores) {
        this.cargarArchivo(); 

        const index = this.products.findIndex((p) => p.id === id);
    
        if (index !== -1) {
          // Si se encuentra el producto, actualizamos sus propiedades
          this.products[index] = { ...this.products[index], ...nuevosValores };
          this.guardarArchivo(); 
          console.log("Producto actualizado correctamente.");
          return 1;
        } else {
          console.log("Producto no encontrado");
          return -1;
        }
    }
    
    // Metodo para eliminar datos de archivo
    deleteProduct(id) {
        this.cargarArchivo();

        const index = this.products.findIndex((p) => p.id === id);
    
        if (index !== -1) {
          // Si se encuentra el producto, lo eliminamos
          this.products.splice(index, 1);
          this.guardarArchivo(); // Guardar después de borrar
          console.log("Producto eliminado correctamente.");
          return 1;
        } else {
          console.log("Producto no encontrado");
          return -1;
        }
    }

}
export default ProductManager;

