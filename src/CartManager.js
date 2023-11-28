import fs from 'fs'

class CartManager{
    constructor(path){
        this.incrementCid = 0;
        this.path = path;
        this.products = [];
        this.carritos = [];
    }

    //Para guardar la informacion de carrito en archivo
    guardarArchivo(){
        const data = JSON.stringify(this.carritos);
        fs.writeFileSync(this.path, data);
    }

    //Para obtener la informacion del archivo y cargarla en carritos
    cargarArchivo(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
                        
            this.carritos = JSON.parse(data);
        } 
        catch (error) {
            // Si existe error, inicializamos carritos como un array vacío
            this.carritos = [];
            console.log("error el abrir el archivo");
        }
    }

    generarCarrito(){

        //Genero un id nuevo.
        

    }
    // /*Compruebo que todas las propiedades sean obligatorias al momento de ingresar el producto */
    // if( product.title && product.description &&product.price &&product.code &&product.stock){
    //     /*Valido si el code del product no exista*/
    //     if (this.products.some((p) => p.code === product.code)) {
    //         console.log("El codigo del producto ya existe.");
    //         return;
    //     } else{

    //         //Si el codigo no existe agrego el producto al array
    //         this.cargarArchivo();
    //         product.id = this.incrementId++;
    //         this.products.push(product);
    //         //Se guarda el producto
    //         this.guardarArchivo();
    //         console.log("Se ingreso ok");
    //         return product.id;
    //     }
    // }else{
    //     console.log("Faltaron parametros para crear el producto")
    // }
}