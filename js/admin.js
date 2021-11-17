import {campoRequerido, validarNumeros, validarURL, validarGeneral} from './helpers.js'
import {Producto} from './classProducto.js'

// agregar validaciones a los elementos del form desde js y no  desde html, ya que podria ser vulnerado

let campoCodigo = document.getElementById('codigo');
let campoProducto = document.getElementById('producto');
let campoDescripcion = document.getElementById('descripcion ');
let campoCantidad = document.getElementById('cantidad');
let campoURL= document.getElementById('imagen');
let formularioProducto = document.getElementById('formProducto')
// lista de productos
let listaProductos = JSON.parse(localStorage.getItem('listaProductosKey')) || [];

// para agrrgar eventos en js se llaman: addEventListener
// desde js, no lleva la palabra 'on' adelante como si lo hace en html
campoCodigo.addEventListener('blur', ()=> {campoRequerido(campoCodigo)});
campoProducto.addEventListener('blur', ()=> {campoRequerido(campoProducto)})
campoDescripcion.addEventListener('blur', ()=> {campoRequerido(campoDescripcion)});
campoCantidad.addEventListener('blur', ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener('blur', ()=>{validarURL(campoURL)});
formularioProducto.addEventListener('submit',guardarProducto);

 function guardarProducto(e){
     e.preventDefault()
    //  valdiar que todos los campos esten correctos
    if (validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)){
       

        // agregar un producto
        crearProducto()
    }
 }
    
 function crearProducto(){
   
    //  crear el objeto prodcuto
    let productoNuevo = new Producto(campoCodigo.value, campoProducto.value, campoDescripcion.value, campoCantidad.value, campoURL.value)
    console.log(productoNuevo);
    // agregar al final dela arreglo el nuevo producto
    listaProductos.push(productoNuevo)
    console.log(listaProductos);
    // limpiar el formulario una vez agregado al arreglo
    limpiarFormulario();
    // guardar en localstorage el arreglo de productos
    guardarLocalstorage();
    // mostrar un mensaje al usuario
    Swal.fire(
        'Producto creado!',
        'Yay! Tu producto fue creado correctamente ',
        'success'
      )



 }

 function limpiarFormulario(){
    // limpiar los value de todo el formulario(solo funciona para los value)
    formularioProducto.reset();
    // limpiar clases
    campoCodigo.className = 'form-control'
    campoProducto.className = 'form-control'
    campoDescripcion.className = 'form-control'
    campoCantidad.className = 'form-control'
    campoURL.className = 'form-control'

 }
 function guardarLocalstorage(){
     localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));
 }
 // expresiones regulares: crean una especie de patron o estructura, para estandarizar devuelve datos boleanos si se cumplen o no
 
 // por ejemplo para validar q sea numerico y tenga un max-lenght de 3 caracteres
