function campoRequerido(input){

    if(input.value.trim().length>0){
        console.log('todo bien')

    }else {console.log('no paso la validacion (!)')}
}

// para agregar elementos a los elementos del form desde js y no con el onclick desde html, ya que podria ser vulnerado

campoCodigo = document.getElementById('codigo');

// para agrrgar eventos en js se llaman: addEventListener
// desde js, no lleva la palabra on adelante como si lo hace en html
campoCodigo.addEventListener('blur', ()=> {campoRequerido(campoCodigo)})
