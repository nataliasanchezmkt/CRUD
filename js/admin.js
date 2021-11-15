function campoRequerido(input){

    if(input.value.trim().length>0){
        
        input.className = 'form-control is-valid';
        return true;

    }else {
    input.className= 'form-control is-invalid'
return false;}
}

// agregar validaciones a los elementos del form desde js y no  desde html, ya que podria ser vulnerado

campoCodigo = document.getElementById('codigo');

// para agrrgar eventos en js se llaman: addEventListener
// desde js, no lleva la palabra on adelante como si lo hace en html
campoCodigo.addEventListener('blur', ()=> {campoRequerido(campoCodigo)});


campoProducto = document.getElementById('producto');
campoProducto.addEventListener('blur', ()=> {campoRequerido(campoProducto)})

campoDescripcion = document.getElementById('descripcion ');
campoDescripcion.addEventListener('blur', ()=> {campoRequerido(campoDescripcion)});


// expresiones regulares: crean una especie de patron o estructura, para estandarizar devuelve datos boleanos si se cumplen o no

// por ejemplo para validar q sea numerico y tenga un max-lenght de 3 caracteres

function validarNumeros (input){
    // crear un expresion regular
    let patron = /^[0-9]{1,3}$/
    // probar el funcionamiento del patron o expresion regular
    if (patron.test(input.value)){
        // cumple la exprecion regular
        input.className = 'form-control is-valid';
        return true

    }else {
        // si no cumple la expresion regular
        input.className = 'form-control is-invalid'
        return false
    }}

campoCantidad = document.getElementById('cantidad');
campoCantidad.addEventListener('blur', ()=>{validarNumeros(campoCantidad)});

 function validarURL(input){
     let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
     if (patron.test(input.value)){
         input.className='form-control is-valid'
         return true
     }else{
         input.className = 'form-control is-invalid'
         return false
     }
 }

 let campoURL= document.getElementById('imagen');
 campoURL.addEventListener('blur', ()=>{validarURL(campoURL)});


let formularioProducto = document.getElementById('formProducto')

function validarGeneral(e){
    e.preventDefault();
    console.log('aca se valida todo de nuevo');
    let alerta = document.getElementById('mensajeAlerta')
    // volver a validar todos los campos
    if(campoRequerido(campoCodigo)&& 
    campoRequerido(campoProducto)&&
    campoRequerido(campoDescripcion)&&
    validarNumeros(campoCantidad)&&
    validarURL(campoURL)
   ){
        console.log('Si paso la validacion')
        alerta.className = 'alert alert-danger my-3 d-none'
    
    }else{
        console.log('No paso la validacion')
       
        alerta.className = 'alert alert-danger my-3'
    }

}
formularioProducto.addEventListener('submit',validarGeneral);


