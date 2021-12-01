// traer los datos del local storage
let listaProductos = JSON.parse(localStorage.getItem('listaProductosKey'))||[];

listaProductos.forEach((producto)=>{crearCard(producto)})
console.log(listaProductos)

function crearCard(producto){
    let grilla = document.getElementById('grillaPrincipal');
    grilla.innerHTML+=`
    <div class="col-sm-12 col-md-6 col-lg-4 mt-3">
            <div class="card">
              <img
                src="${producto.url}"
                class="card-img-top"
                alt="${producto.product}"
              />
              <div class="card-body bg-light">
                <h5 class="card-title">${producto.product}</h5>
                <p class="card-text">
                ${producto.description}
               
                </p>
              </div>
            </div>
          </div>
    
    `
}