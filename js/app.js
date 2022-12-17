const stockProductos = [
  {
    id: 1,
    nombre: "Desayuno 1",
    cantidad: 1,
    desc: "Super desayuno con Sandowich, dulces, frutas",
    precio: 30000,
    img: "imag/segunda/1.jpg",
  },
  {
    id: 2,
    nombre: "Desayuno 2",
    cantidad: 1,
    desc: "Super desayuno con Sandowich, frutas y globo",
    precio: 40000,
    img: "imag/segunda/2.jpg",
  },
  {
    id: 3,
    nombre: "Desayuno 3",
    cantidad: 1,
    desc: "Super combo con Sanduich, chocolotaes y globo.",
    precio: 50000,
    img: "imag/segunda/3.jpg",
  },
  {
    id: 4,
    nombre: "Combo de Dulces",
    cantidad: 1,
    desc: "Especial combo de dulces con chocolates, manis",
    precio: 15000,
    img: "imag/segunda/4.jpg",
  },
  {
    id: 5,
    nombre: "Combo de Dulces 2",
    cantidad: 1,
    desc: "Espectacular combo con galletas y chocolates",
    precio: 1200,
    img: "imag/segunda/5.jpg",
  },
  {
    id: 6,
    nombre: "Ancheta",
    cantidad: 1,
    desc: "Ancheta de dulces con globo",
    precio: 18000,
    img: "imag/segunda/6.jpg",
  },
  {
    id: 7,
    nombre: "Desayuno sorpresa",
    cantidad: 1,
    desc: "Congtienes sanduiwch, banano, mermelada, ",
    precio: 31000,
    img: "imag/segunda/7.jpg",
  },
  {
    id: 8,
    nombre: "Combo desayuno + Peluche",
    cantidad: 1,
    desc: "Desayuno con todo incluido y peluche ",
    precio: 80000,
    img: "imag/segunda/8.jpg",
  },
  {
    id: 9,
    nombre: "Ancheta de dulces",
    cantidad: 1,
    desc: "Caramelos, mani, dulces",
    precio: 14000,
    img: "imag/segunda/9.jpg",
  },
  {
    id: 10,
    nombre: "Ancheta mediana",
    cantidad: 1,
    desc: "Anchetica mediana con chocolates, mani, y galletas",
    precio: 22000,
    img: "imag/segunda/10.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarrito();

  if(activarFuncion){
  document.querySelector("#activarFuncion").click(procesarPedido);
  }
  
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem; color:  #7a7a7a;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" style=" width: 100%;" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e){
  e.preventDefault()
  const persona = document.querySelector('#persona').value
  const email = document.querySelector('#email').value
  const ced = document.querySelector('#ced').value
  const tel = document.querySelector('#tel').value


  if(email === '' || persona == ''|| ced == '' || tel == '' ){
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
      procesarPedido
  })
} else {
 const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

btn.value = 'Enviando...';

const serviceID = 'default_service';
const templateID = 'template_5ebjn5h';

emailjs.sendForm(serviceID, templateID, this)
 .then(() => {
   btn.value = 'Send Email';
   alert('Enviado!');
 }, (err) => {
   btn.value = 'Enviado Email';
   alert(JSON.stringify(err));
 })
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }

 