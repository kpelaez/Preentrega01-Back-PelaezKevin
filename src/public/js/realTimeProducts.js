// levantamo el socket del lado del cliente

const socket = io();

socket.on('product-added' , (product)=>{

});

socket.on('product-updated' , ( {id, nuevosValores})=>{

});

socket.on('product-deleted',(id)=>{
    
})
