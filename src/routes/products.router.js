import express from 'express';
import ProductManager from '../ProductManager.js'


const router = express.Router();

router.get('/', (req,res) =>{
    const limit = req.query.limit;
    
    const PM = new ProductManager('K:/CODERHOUSE/FULLSTACK/BackEnd/Preentrega01-Back-PelaezKevin/src/productos.json'); 
    PM.cargarArchivo();

    const products = PM.getProducts();
    
    if(!limit){
        //si limit es nulo, entonces traigo todos los productos
        res.send(products);
    }
    else{
        let contador = 0;
        const productArray = [];

        for (let product of products){
            
            productArray.push(product);
            contador++;
            
            if(contador===parseInt(limit)){
                break;
            }
        }
        res.send(productArray);
    }

})

router.get('/:pid', (req,res)=> {
    const pid = req.params.pid;

    const PM = new ProductManager('K:/CODERHOUSE/FULLSTACK/BackEnd/Preentrega01-Back-PelaezKevin/src/productos.json');

    const productById = PM.getProductById(pid)

    res.send(productById);


})

router.post('/',(req,res)=>{

    producto = req.body;

    const PM = new ProductManager('K:/CODERHOUSE/FULLSTACK/BackEnd/Preentrega01-Back-PelaezKevin/src/productos.json');

    const idGenerado = PM.addProduct(producto);

    res.status(201).send({status: 'ok', idGenerado: idGenerado});
})

router.put('/:pid', (req,res)=>{

    const pid = parseInt(req.params.pid);
    const newBody = req.body;

    const PM = new ProductManager('K:/CODERHOUSE/FULLSTACK/BackEnd/Preentrega01-Back-PelaezKevin/src/productos.json');

    const resultado = PM.updateProduct(pid,newBody);

    if(resultado===1){
        res.status(200).send({status: 'ok', description: 'Se actualizo correctamente'});
    } else {
        res.status(404).send({status: 'error', description: 'No se pudo realizar la actualizacion, producto no encontrado'});
    }

})

router.delete(':pid', (req,res)=>{

    id = req.params.pid;

    const PM = new ProductManager('K:/CODERHOUSE/FULLSTACK/BackEnd/Preentrega01-Back-PelaezKevin/src/productos.json');

    const resultado = PM.deleteProduct(id);

    if(resultado === 1){
        res.status(200).send({status:'ok', description:'Se elimino correctamente el recurso'});
    } else{
        res.status(404).send({status: 'error', description:'No se pudo elminar el recurso. Producto no encontrado'});
    }

})
export default router;


