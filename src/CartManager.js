import fs from 'fs'

class CartManager{
    constructor(path){
        this.ultimoCarritoId = this.obtenerUltimoId();
        this.path = path;
        this.carritos = this.cargarArchivo();
    }

    //Cargar datos del archivo 
    cargarArchivo() {
        try {
          const data = fs.readFileSync(this.path, 'utf-8');
          
          return JSON.parse(data);

        } catch (error) {

            console.log("Se carga archivo vacio");
            return [];
        }
    }

    //Guardar datos en Archivo para persistencia
    guardarArchivo() {
        const data = JSON.stringify(this.carritos);

        fs.writeFileSync(this.path, data, 'utf-8');
    }
    
    obtenerUltimoId() {
        //Genero un array con los Id y devuelvo solo el mas alto o 0 si no hay valores en carritos
        return Math.max(...this.carritos.map(cart => cart.id), 0) + 1;
    }

    crearCarrito() {
        const cart = {
          id: this.ultimoCarritoId++,
          products: []
        };

        this.carritos.push(cart);
        this.guardarArchivo();
        return cart;
      }

    getCartById(cartId) {

        return this.carritos.find(cart => cart.id === cartId);
    }

    agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        const cart = this.getCartById(cartId);
    
        if (!cart) {
            // Carrito no encontrado
            console.log("Carrito no encontrado");
            return null; 
        }
    
        const existeProduct = cart.products.find(product => product.id === productId);
        
        //Si existe el producto en el carrito se añade la cantidad
        if (existeProduct) {
          existeProduct.quantity += quantity;
        }
        //Si no existe el producto en el carrito lo añado 
        else {
          cart.products.push({
            id: productId,
            quantity: quantity
          });
        }
        this.guardarArchivo();
        return cart;
    }    
}

export default CartManager;