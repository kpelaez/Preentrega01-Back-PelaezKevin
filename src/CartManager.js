import fs from 'fs'

class CartManager{
    constructor(path){
        this.carritos = this.cargarArchivo();
        this.ultimoCarritoId = this.obtenerUltimoId();
        this.path = path;     
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
      //Genero un array con los Id y devuelvo solo el mas alto o 1 si no hay valores en carritos
      let maxId = 0;
      
      if(this.carritos.lenght  && this.carritos){
        return 1;
      }
      
      for (const cart of this.carritos){
        if(cart.id > maxId){
          maxId = cart.id;
        }  
      }
      return maxId + 1;
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