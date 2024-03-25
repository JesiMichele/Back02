const ProductManager = require("./ProductManager");

const producto = new ProductManager();

console.log(producto.addProduct(`Iphone`, `ProMax`, 1500, `htpps:/img1.com`, `j22`, 130));
console.log(producto.addProduct(`Notbook`, `Apple`, 2500, `htpps:/img2.com`, `s28`, 75));
console.log(producto.addProduct(`Notbook`, `Apple`, 2500, `htpps:/img2.com`, `s55`, 75));

//descomentar para probar las funcionalidades

//console.log(producto.getProduct()); //agregar pproducto
//console.log(producto.getProductById(1)) //agregar producto por su id
//console.log(producto.deleteProduct(2)) //eliminar producto

//const productoActualizado=
//{"id":12,"tittle":"Notbook 8","description":"Apple3","price":4500,"thumbnail":"htpps:/img2.com"}


//console.log(producto.updateProduct(2, productoActualizado))