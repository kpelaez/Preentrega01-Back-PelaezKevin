import express from 'express';
import CartManager from '../CartManager.js';

const router = express.Router();
const CM = new CartManager('../carts.json');

router.post('/', (req,res)=>{
    const newCart = CM.crearCarrito();
    //devolvemos el carrito creado 
    res.status(201).send({status: 'ok', data: newCart});
})

router.get('/:cid', (req,res)=>{

    const cartId = parseInt(req.params.cid);
    const cart = CM.getCartById(cartId);

    if(cart){
        res.status(200).send(cart.products);
    }else{
        //retornamos el mensaje de error
        res.status(404).send({error: 'No se encontro el carrito'});
    }
})

router.post(':cid/product/:pid', (req,res)=>{

    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = CM.agregarProductoAlCarrito(cartId,productId,1);

    if(cart){
        res.status(201).send({status: 'ok', data: cart.products});
    }else{
        //retornamos el mensaje de error
        res.status(404).send({error: 'Carrito no encontrado'});
    }
})

export default router;