import express from 'express'
// importador de handlebars
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
//importador de Servidor de websocket
import Server from 'socket.io';


// Importador de rutas
import productRouter from './routes/apis/products.router.js';
import cartsRouter from './routes/apis/carts.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();

// Configuracion de motor de handlebars
app.engine('hbs',handlebars.engine({
    extname:'.hbs'
}))
app.set('views', __dirname+'views');
app.set('view engine', 'hbs');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Direcciones de acceso a rutas de Api
app.use('/api/products',productRouter);
app.use('/api/carts',cartsRouter);
//Direcciones de acceso a views con plantilla handlebars
app.use('/views', viewsRouter);

// Servidor escuchando
const serverHttp = app.listen(8080, ()=>console.log("El servidor esta escuchando."));


//Instancio el servidor websocket, le pasamos como argumento el servidor HTTP
const socketServer = new Server(serverHttp);
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    // socket.on()
})




