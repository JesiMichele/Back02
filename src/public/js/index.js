const socket=io();
socket.on('productos',productos=>{
    const tbody= document.getElementById('Productos-body');
    tbody.innerHTML= '';

    productos.forEach(producto => {
        const row= tbody.insertRow();
        row.innerHTML=`
       
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.price}</td>
        <td>${producto.code}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.status ? 'Activo': 'Desactivo'}</td>
        <td>${producto.thumbnail.length > 0 ? producto.thumbnail[0]:'No existe la imagen'}</td>
       

        
        
        
        
        
        
        
        
        `;
    });
})

const form= document.getElementById('Prod-Form');

form.addEventListener('submit', function(event){
        event.preventDefault();

        const title= document.getElementById('title').value
        const description= document.getElementById('description').value
        const price= document.getElementById('price').value
        const code= document.getElementById('code').value
        const stock= document.getElementById('stock').value
        const category= document.getElementById('category').value
       
 
const producto= {
       title: title,
       description:description,
       price:price,
       code:code,
       stock:stock,
       category:category
};
socket.emit('agregarProducto', producto);
form.requestFullscreen();
}) ;