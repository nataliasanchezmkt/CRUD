// aca se guardan las validaciones de formularios
// agregar validaciones a los elementos del form desde js y no  desde html, ya que podria ser vulnerado


export function campoRequerido(input){

    if(input.value.trim().length>0){
        
        input.className = 'form-control is-valid';
        return true;

    }else {
    input.className= 'form-control is-invalid'
return false;}
}


// expresiones regulares: crean una especie de patron o estructura, para estandarizar devuelve datos boleanos si se cumplen o no
 
 // por ejemplo para validar q sea numerico y tenga un max-lenght de 3 caracteres
 
export function validarNumeros (input){
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

   export  function validarURL(input){
        let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
        if (patron.test(input.value)){
            input.className='form-control is-valid'
            return true
        }else{
            input.className = 'form-control is-invalid'
            return false
        }
    }


   export  function validarGeneral(campoCodigo,campoProducto,campoDescripcion, campoCantidad, campoURL){
        
        // console.log('aca se valida todo de nuevo');
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
            return true
        
        }else{
            console.log('No paso la validacion')
           
            alerta.className = 'alert alert-danger my-3'
            return false
        }
    
    }