import express from 'express';
import ProductManager from '../managers/ProductManager';
import { __dirname } from '../utils';

const router = express.Router();

const PM = new ProductManager(__dirname+'../managers/productos.json')



router.get('/home', (req,res) =>{
    
    const productos = PM.getProducts();
    
    //Paso un objeto para la plantilla home.hbs
    res.render('home.hbs',{
        title: 'Listado Productos',
        productos: productos,
        style: ''
        });
})

router.get('/realtimeproducts', (req,res)=>{


    res.render('realTimeProducts.hbs',{});
})


export default router;