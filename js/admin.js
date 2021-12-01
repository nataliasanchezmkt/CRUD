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
let productoExistente =  false; //si productoExistente = false : nuevo producto . si producto existente=true : llamo a modificarProducto
let btnAgregar= document.getElementById('btnAgregar');


// para agrrgar eventos en js se llaman: addEventListener
// desde js, no lleva la palabra 'on' adelante como si lo hace en html
campoCodigo.addEventListener('blur', ()=> {campoRequerido(campoCodigo)});
campoProducto.addEventListener('blur', ()=> {campoRequerido(campoProducto)})
campoDescripcion.addEventListener('blur', ()=> {campoRequerido(campoDescripcion)});
campoCantidad.addEventListener('blur', ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener('blur', ()=>{validarURL(campoURL)});
formularioProducto.addEventListener('submit',guardarProducto);
btnAgregar.addEventListener('click', limpiarFormulario)

// llamar ala funcion cargaInicial
cargaInicial();

 function guardarProducto(e){
     e.preventDefault()
    //  valdiar que todos los campos esten correctos
    if (validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)){
      if(productoExistente == false){
       // caso 1: agregar un producto
        crearProducto();
      }else{
        // caso 2: el usuario quiere editar un producto
        modificarProducto();

      }
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
    //   creo una nueva fila en la tabla

    crearFila(productoNuevo);



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

    //limpiar la variable booleana
    productoExistente=false;

 }
 function guardarLocalstorage(){
     localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));
 }
 // expresiones regulares: crean una especie de patron o estructura, para estandarizar devuelve datos boleanos si se cumplen o no
 
 // por ejemplo para validar q sea numerico y tenga un max-lenght de 3 caracteres


 function crearFila(producto){
     let tabla = document.getElementById('tablaProductos');
     tabla.innerHTML += `<tr>
     <th>${producto.code}</th>
     <td> ${producto.product} </td>
     <td>${producto.description}</td>
     <td>${producto.amount}</td>
     <td>${producto.url}</td>
     <td class="text-center" >
     <button class="btn btn-success" onclick='prepararEdicionProducto(${producto.code})'>Editar</button>
     <button class="btn btn-danger mt-2" onclick='borrarProducto(${producto.code})'>Eliminar</button>
   </td>
   </tr>`



 }

 function cargaInicial(){
    //  si hay datos en local storage o en lista productos : dijulo las filas

    if(listaProductos.length>0){
        // dibujar fila
       listaProductos.forEach((itemProducto) => {crearFila(itemProducto)});
    }

 }


 function borrarTabla(){
     let tabla = document.getElementById('tablaProductos');
     tabla.innerHTML = '';
 }

 window.prepararEdicionProducto = (paramCodigo)=>{
     console.log(paramCodigo);
   //  pbtener el objeto a modificar
   let productoBuscado = listaProductos.find((itemProducto)=>{return itemProducto.code == paramCodigo})
   console.log(productoBuscado);
   // motrarlo dnetro del form
   campoProducto.value = productoBuscado.product;
   campoCodigo.value = productoBuscado.code;
   campoDescripcion.value = productoBuscado.description
   campoCantidad.value = productoBuscado.amount
   campoURL.value= productoBuscado.url;
   //aca se modificara la variable booleana
   productoExistente = true;

 }


function modificarProducto(){
  console.log('se esta ejecutando modfi producto');
  // bucar la posicion de mi ibjeto dentro del arreglo listaProducto
  let posicionProducto = listaProductos.findIndex((itemProducto)=>{return itemProducto.code ==  campoCodigo.value});
  console.log(posicionProducto)
//  modificar los datos de este producto
listaProductos[posicionProducto].product = campoProducto.value
listaProductos[posicionProducto].amount = campoCantidad.value
listaProductos[posicionProducto].description = campoDescripcion.value
listaProductos[posicionProducto].url = campoURL.value
console.log(listaProductos);

// actualizar en el localStorage
guardarLocalstorage();

// limpair el formulario
limpiarFormulario();

// actualziar la tabla
borrarTabla();
listaProductos.forEach((itemProducto) => {crearFila(itemProducto)});


// mostar un cartel al usuario de que modifico el producto
Swal.fire(
  'Producto editado!',
  'Hurra!! Tu producto fue modificado correctamente ',
  'success'
)

}

window.borrarProducto = function(paramCodigo){
  console.log('desde borrar producto');
  // borro el producto del arreglo
  let arregloProductoBorrado = listaProductos.filter((itemProducto)=>{return itemProducto.code != paramCodigo })
  console.log(arregloProductoBorrado)
  // actualziar el localStorage
  listaProductos =  arregloProductoBorrado;
  guardarLocalstorage();

// actualizar la tabla
borrarTabla();
listaProductos.forEach((itemProducto) => {crearFila(itemProducto)});

// mostrar mensaje al usuario
Swal.fire(
  'Producto eliminado.',
  ' Tu producto fue eliminado correctamente ',
  'success'
)
}











