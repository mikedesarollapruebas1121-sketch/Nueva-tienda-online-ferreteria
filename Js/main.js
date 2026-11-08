document.addEventListener('DOMContentLoaded', function () {

    // 1. Lógica para el Login
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    // 2. Lógica para Formularios de Registro / Usuario
    const formCliente = document.getElementById('formCliente');
    if (formCliente) {
        formCliente.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre')?.value || '';
            const documento = document.getElementById('documento')?.value || '';
            const correo = document.getElementById('correo')?.value || '';

            if (nombre === '' || documento === '' || correo === '') {
                alert('Por favor complete los campos obligatorios.');
            } else {
                alert('Datos procesados correctamente.');
            }
        });
    }

    // 3. Filtro de búsqueda en tablas (si existe)
    const buscarCliente = document.getElementById('buscarCliente');
    if (buscarCliente) {
        buscarCliente.addEventListener('keyup', function () {
            const textoBusqueda = buscarCliente.value.toLowerCase();
            const filas = document.querySelectorAll('#tablaClientes tbody tr');

            filas.forEach(function (fila) {
                const contenidoFila = fila.textContent.toLowerCase();
                fila.style.display = contenidoFila.includes(textoBusqueda) ? '' : 'none';
            });
        });
    }

});

// 4. Función global para alternar la visibilidad de la contraseña
function alternarContrasena() {
    const input = document.getElementById('contrasena');
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}


// Arreglo de productos de ferretería
const productosFerreteria = [
    {
        id: 1,
        nombre: "Taladro Percutor Inalámbrico 18V",
        categoria: "Eléctricas",
        medida: "1/2 pulgada",
        color: "Negro/Rojo",
        precio: 285000,
        imagen: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        nombre: "Juego de Brocas y Puntas de Impacto",
        categoria: "Accesorios",
        medida: "32 Piezas",
        color: "Azul/Negro",
        precio: 45000,
        imagen: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        nombre: "Llave Inglesa Profesional Ajustable",
        categoria: "Herramientas",
        medida: "8 pulgadas",
        color: "Cromo",
        precio: 42000,
        imagen: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 4,
        nombre: "Nivel Láser Autonivelante de Líneas",
        categoria: "Medición",
        medida: "15 metros",
        color: "Azul/Negro",
        precio: 195000,
        imagen: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 5,
        nombre: "Planta Eléctrica Generador Gasolina",
        categoria: "Maquinaria",
        medida: "5.5 HP",
        color: "Verde Militar",
        precio: 1450000,
        imagen: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        nombre: "Caja de Herramientas Plástica Reforzada",
        categoria: "Organizadores",
        medida: "20 pulgadas",
        color: "Negro/Amarillo",
        precio: 62000,
        imagen: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        nombre: "Concretera Mezcladora de Cemento",
        categoria: "Construcción",
        medida: "1 Bolsa (Brix)",
        color: "Naranja",
        precio: 1850000,
        imagen: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 8,
        nombre: "Kit de Protección Industrial EPP",
        categoria: "Especialidad",
        medida: "Estándar",
        color: "Amarillo",
        precio: 78000,
        imagen: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=300&q=80"
    }
];

let carrito = [];
let categoriaActiva = '';

const contenedorCatalogo = document.getElementById('catalogo-productos');
const filtroMedida = document.getElementById('filtro-medida');
const filtroColor = document.getElementById('filtro-color');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarritoElem = document.getElementById('total-carrito');
const contadorItemsElem = document.getElementById('contador-items');

function pintarCatalogo(productosAImprimir) {
    if (!contenedorCatalogo) return;
    contenedorCatalogo.innerHTML = '';
    
    if (productosAImprimir.length === 0) {
        contenedorCatalogo.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: var(--text-soft); font-weight: 500; margin-bottom: 12px;">No se encontraron productos con los filtros seleccionados.</p>
                <button onclick="resetearFiltros()" class="btn btn-secondary">Ver todos los productos</button>
            </div>`;
        return;
    }

    productosAImprimir.forEach(producto => {
        const tarjeta = document.createElement('div');
        // Usamos la clase global .card para mantener el diseño idéntico al sistema
        tarjeta.className = 'card';
        tarjeta.style.padding = '20px';
        tarjeta.style.display = 'flex';
        tarjeta.style.flexDirection = 'column';
        tarjeta.style.justifyContent = 'space-between';
        
        tarjeta.innerHTML = `
            <div>
                <div style="position: relative; margin-bottom: 12px;">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 12px;">
                    <span style="position: absolute; top: 8px; left: 8px; background: var(--sidebar); color: white; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 6px; text-transform: uppercase;">
                        ${producto.categoria}
                    </span>
                </div>
                <h3 style="font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; line-height: 1.4;">${producto.nombre}</h3>
                <p style="font-size: 13px; color: var(--text-soft); margin-bottom: 4px;">Medida: <strong style="color: var(--text);">${producto.medida}</strong></p>
                <p style="font-size: 13px; color: var(--text-soft); margin-bottom: 12px;">Acabado: <strong style="color: var(--text);">${producto.color}</strong></p>
                <p style="font-size: 18px; font-weight: 800; color: var(--success); margin-bottom: 16px;">$ ${producto.precio.toLocaleString('es-CO')}</p>
            </div>
            <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary" style="width: 100%;">
                Agregar al carrito
            </button>
        `;
        contenedorCatalogo.appendChild(tarjeta);
    });
}

function filtrarPorCategoria(categoria) {
    categoriaActiva = categoria;
    aplicarFiltrosCombinados();
}

function aplicarFiltrosCombinados() {
    const medidaSeleccionada = filtroMedida ? filtroMedida.value : '';
    const colorSeleccionado = filtroColor ? filtroColor.value : '';

    const productosFiltrados = productosFerreteria.filter(prod => {
        const coincideCategoria = categoriaActiva === '' || prod.categoria === categoriaActiva;
        const coincideMedida = medidaSeleccionada === '' || prod.medida === medidaSeleccionada;
        const coincideColor = colorSeleccionado === '' || prod.color === colorSeleccionado;
        return coincideCategoria && coincideMedida && coincideColor;
    });

    pintarCatalogo(productosFiltrados);
}

function resetearFiltros() {
    categoriaActiva = '';
    if (filtroMedida) filtroMedida.value = '';
    if (filtroColor) filtroColor.value = '';
    pintarCatalogo(productosFerreteria);
}

function inicializarFiltrosSelect() {
    if (!filtroMedida || !filtroColor) return;

    const medidasUnicas = [...new Set(productosFerreteria.map(p => p.medida))];
    const coloresUnicos = [...new Set(productosFerreteria.map(p => p.color))];

    medidasUnicas.forEach(medida => {
        const option = document.createElement('option');
        option.value = medida;
        option.textContent = medida;
        filtroMedida.appendChild(option);
    });

    coloresUnicos.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        filtroColor.appendChild(option);
    });

    filtroMedida.addEventListener('change', aplicarFiltrosCombinados);
    filtroColor.addEventListener('change', aplicarFiltrosCombinados);
}

function agregarAlCarrito(idProducto) {
    const productoEncontrado = productosFerreteria.find(p => p.id === idProducto);
    if (!productoEncontrado) return;

    const itemEnCarrito = carrito.find(item => item.id === idProducto);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }

    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    if (!listaCarrito || !totalCarritoElem) return;

    listaCarrito.innerHTML = '';
    let total = 0;
    let cantidadTotalItems = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<li style="color: var(--text-soft); text-align: center; font-size: 14px; padding: 16px 0;">El carrito está vacío</li>`;
        totalCarritoElem.textContent = '$ 0';
        if (contadorItemsElem) contadorItemsElem.textContent = '0 items';
        return;
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        cantidadTotalItems += item.cantidad;

        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.borderBottom = '1px solid #F1F5F9';
        li.style.padding = '10px 0';
        li.style.fontSize = '14px';
        
        li.innerHTML = `
            <div>
                <p style="font-weight: 600; color: var(--text);">${item.nombre}</p>
                <p style="font-size: 12px; color: var(--text-soft);">${item.cantidad} x $ ${item.precio.toLocaleString('es-CO')}</p>
            </div>
            <div style="text-align: right;">
                <span style="font-weight: 700; color: var(--text); display: block;">$ ${subtotal.toLocaleString('es-CO')}</span>
                <button onclick="eliminarDelCarrito(${item.id})" style="background: none; border: none; color: var(--danger); font-size: 12px; font-weight: 600; cursor: pointer; padding-top: 2px;">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    totalCarritoElem.textContent = `$ ${total.toLocaleString('es-CO')}`;
    if (contadorItemsElem) contadorItemsElem.textContent = `${cantidadTotalItems} items`;
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarritoUI();
}

function procesarCompra() {
    if (carrito.length === 0) {
        alert('Agrega al menos un producto al carrito para realizar el pedido.');
        return;
    }
    alert('¡Pedido de Ferresasweb generado correctamente con éxito!');
    carrito = [];
    actualizarCarritoUI();
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarFiltrosSelect();
    pintarCatalogo(productosFerreteria);
});