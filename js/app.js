
/* =========================================================
   DRAKEFORD ATELIER
   app.js
========================================================= */


/* =========================================================
   MENÚ MÓVIL
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("mostrar");
});


/* =========================================================
   WHATSAPP
========================================================= */

const numeroWhatsApp = "595971402098";


function abrirWhatsApp(mensaje) {

    const mensajeCodificado =
        encodeURIComponent(mensaje);

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    window.open(
        url,
        "_blank"
    );
}


/* =========================================================
   AGENDAR CITA
========================================================= */

const btnAgendar =
    document.getElementById("btnAgendar");


btnAgendar.addEventListener(
    "click",
    () => {

        abrirWhatsApp(
`Hola Drakeford Atelier.

Quisiera agendar una cita para conocer y probarme algunos vestidos.

Nombre:
Fecha aproximada:
Tipo de evento:`
        );

    }
);


/* =========================================================
   WHATSAPP FLOTANTE
========================================================= */

const whatsappFlotante =
    document.getElementById(
        "whatsappFlotante"
    );


whatsappFlotante.addEventListener(
    "click",
    event => {

        event.preventDefault();

        abrirWhatsApp(
            "Hola Drakeford Atelier. Quisiera recibir más información."
        );

    }
);


/* =========================================================
   CATÁLOGO
========================================================= */

const vestidosGrid =
    document.getElementById(
        "vestidosGrid"
    );

const botonesFiltro =
    document.querySelectorAll(
        ".filtro"
    );

const buscadorVestidos =
    document.getElementById(
        "buscadorVestidos"
    );


let categoriaActual = "Todos";


/* =========================================================
   FORMATO GUARANÍES
========================================================= */

function formatearGuaranies(valor) {

    return new Intl.NumberFormat(
        "es-PY"
    ).format(valor);

}


/* =========================================================
   MOSTRAR VESTIDOS
========================================================= */

function mostrarVestidos(lista) {

    vestidosGrid.innerHTML = "";


    if (lista.length === 0) {

        vestidosGrid.innerHTML = `
            <p style="
                grid-column: 1 / -1;
                text-align: center;
                color: #888;
                padding: 50px;
            ">
                No se encontraron vestidos.
            </p>
        `;

        return;
    }


    lista.forEach(
        vestido => {

            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.classList.add(
                "vestido-card"
            );


            tarjeta.innerHTML = `

                <div class="vestido-imagen">

                    <img
                        src="${vestido.imagen}"
                        alt="Vestido ${vestido.nombre}"
                    >


                    <span class="vestido-categoria">

                        ${vestido.categoria}

                    </span>


                    <span class="
                        estado-vestido
                        ${
                            vestido.disponible
                            ? "disponible"
                            : "no-disponible"
                        }
                    ">

                        ${
                            vestido.disponible
                            ? "Disponible"
                            : "Reservado"
                        }

                    </span>


                    <div class="vestido-overlay">

                        <div class="overlay-contenido">

                            <p>
                                Drakeford Atelier
                            </p>


                            <h4>
                                ${vestido.nombre}
                            </h4>


                            <div class="overlay-acciones">

                                <button
                                    class="overlay-btn overlay-detalles"
                                    onclick="verDetalles(${vestido.id})"
                                >

                                    <i class="fa-regular fa-eye"></i>

                                    Ver detalles

                                </button>


                                <button
                                    class="overlay-btn overlay-reservar"
                                    onclick="reservarVestido(${vestido.id})"

                                    ${
                                        vestido.disponible
                                        ? ""
                                        : "disabled"
                                    }
                                >

                                    <i class="fa-brands fa-whatsapp"></i>

                                    ${
                                        vestido.disponible
                                        ? "Reservar"
                                        : "No disponible"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </div>


                <div class="vestido-info">

                    <div class="vestido-info-superior">

                        <div>

                            <h3>
                                ${vestido.nombre}
                            </h3>


                            <p class="vestido-talla">

                                <i class="fa-solid fa-ruler"></i>

                                Tallas: ${vestido.talla}

                            </p>

                        </div>


                        <button
                            class="vestido-favorito"
                            aria-label="Agregar ${vestido.nombre} a favoritos"
                            data-id="${vestido.id}"
                        >

                            <i class="fa-regular fa-heart"></i>

                        </button>

                    </div>


                    <div class="vestido-precios">

                        <div class="precio">

                            <span>
                                Compra
                            </span>


                            <strong>
                                Gs. ${formatearGuaranies(
                                    vestido.precioVenta
                                )}
                            </strong>

                        </div>


                        <div class="precio">

                            <span>
                                Alquiler
                            </span>


                            <strong>
                                Gs. ${formatearGuaranies(
                                    vestido.precioAlquiler
                                )}
                            </strong>

                        </div>

                    </div>


                    <button
                        class="vestido-ver-mobile"
                        onclick="verDetalles(${vestido.id})"
                    >

                        Ver vestido

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>
            `;


            vestidosGrid.appendChild(
                tarjeta
            );

        }
    );

}


/* =========================================================
   FILTROS
========================================================= */

function aplicarFiltros() {

    const busqueda =
        buscadorVestidos.value
            .toLowerCase()
            .trim();


    const resultado =
        vestidos.filter(
            vestido => {

                const coincideCategoria =
                    categoriaActual ===
                    "Todos"
                    ||
                    vestido.categoria ===
                    categoriaActual;


                const coincideBusqueda =
                    vestido.nombre
                        .toLowerCase()
                        .includes(
                            busqueda
                        );


                return (
                    coincideCategoria
                    &&
                    coincideBusqueda
                );

            }
        );


    mostrarVestidos(
        resultado
    );

}


/* =========================================================
   BOTONES DE FILTRO
========================================================= */

botonesFiltro.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                botonesFiltro.forEach(
                    item => {

                        item.classList.remove(
                            "activo"
                        );

                    }
                );


                boton.classList.add(
                    "activo"
                );


                categoriaActual =
                    boton.dataset.categoria;


                aplicarFiltros();

            }
        );

    }
);


/* =========================================================
   BUSCADOR
========================================================= */

buscadorVestidos.addEventListener(
    "input",
    aplicarFiltros
);


/* =========================================================
   RESERVAR VESTIDO
========================================================= */

function reservarVestido(id) {

    const vestido =
        vestidos.find(
            item =>
                item.id === id
        );


    if (!vestido) {
        return;
    }


    if (!vestido.disponible) {
        return;
    }


    abrirWhatsApp(
`Hola Drakeford Atelier.

Quisiera consultar la disponibilidad y reservar el vestido ${vestido.nombre}.

Categoría: ${vestido.categoria}
Precio de alquiler: Gs. ${formatearGuaranies(vestido.precioAlquiler)}

Nombre:
Fecha del evento:
Talla aproximada:`
    );

}


/* =========================================================
   MODAL
========================================================= */

const modalVestido =
    document.getElementById(
        "modalVestido"
    );

const modalCerrar =
    document.getElementById(
        "modalCerrar"
    );

const modalImagen =
    document.getElementById(
        "modalImagen"
    );

const modalCategoria =
    document.getElementById(
        "modalCategoria"
    );

const modalNombre =
    document.getElementById(
        "modalNombre"
    );

const modalEstado =
    document.getElementById(
        "modalEstado"
    );

const modalPrecioVenta =
    document.getElementById(
        "modalPrecioVenta"
    );

const modalPrecioAlquiler =
    document.getElementById(
        "modalPrecioAlquiler"
    );

const modalTallas =
    document.getElementById(
        "modalTallas"
    );

const modalDescripcion =
    document.getElementById(
        "modalDescripcion"
    );

const modalReservar =
    document.getElementById(
        "modalReservar"
    );


let vestidoSeleccionado = null;


/* =========================================================
   ABRIR DETALLES
========================================================= */

function verDetalles(id) {

    vestidoSeleccionado =
        vestidos.find(
            vestido =>
                vestido.id === id
        );


    if (!vestidoSeleccionado) {
        return;
    }


    modalImagen.src =
        vestidoSeleccionado.imagen;


    modalImagen.alt =
        `Vestido ${vestidoSeleccionado.nombre}`;


    modalCategoria.textContent =
        vestidoSeleccionado.categoria;


    modalNombre.textContent =
        vestidoSeleccionado.nombre;


    modalPrecioVenta.textContent =
        `Gs. ${formatearGuaranies(
            vestidoSeleccionado.precioVenta
        )}`;


    modalPrecioAlquiler.textContent =
        `Gs. ${formatearGuaranies(
            vestidoSeleccionado.precioAlquiler
        )}`;


    modalTallas.textContent =
        vestidoSeleccionado.talla;


    modalDescripcion.textContent =
        vestidoSeleccionado.descripcion;


    if (
        vestidoSeleccionado.disponible
    ) {

        modalEstado.textContent =
            "Disponible";


        modalEstado.classList.remove(
            "reservado"
        );


        modalReservar.disabled =
            false;


        modalReservar.innerHTML = `

            <i class="fa-brands fa-whatsapp"></i>

            Reservar por WhatsApp

        `;

    } else {

        modalEstado.textContent =
            "Actualmente reservado";


        modalEstado.classList.add(
            "reservado"
        );


        modalReservar.disabled =
            true;


        modalReservar.textContent =
            "No disponible";

    }


    modalVestido.classList.add(
        "activo"
    );


    document.body.classList.add(
        "modal-abierto"
    );

}


/* =========================================================
   CERRAR MODAL
========================================================= */

function cerrarModalVestido() {

    modalVestido.classList.remove(
        "activo"
    );


    document.body.classList.remove(
        "modal-abierto"
    );

}


/* =========================================================
   BOTÓN CERRAR MODAL
========================================================= */

modalCerrar.addEventListener(
    "click",
    cerrarModalVestido
);


/* =========================================================
   CERRAR MODAL AL TOCAR AFUERA
========================================================= */

modalVestido.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalVestido
        ) {

            cerrarModalVestido();

        }

    }
);


/* =========================================================
   CERRAR MODAL CON ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            cerrarModalVestido();

        }

    }
);


/* =========================================================
   RESERVAR DESDE MODAL
========================================================= */

modalReservar.addEventListener(
    "click",
    () => {

        if (
            !vestidoSeleccionado
        ) {
            return;
        }


        reservarVestido(
            vestidoSeleccionado.id
        );

    }
);


/* =========================================================
   FAVORITOS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const boton =
            event.target.closest(
                ".vestido-favorito"
            );


        if (!boton) {
            return;
        }


        const icono =
            boton.querySelector(
                "i"
            );


        if (!icono) {
            return;
        }


        if (
            icono.classList.contains(
                "fa-regular"
            )
        ) {

            icono.classList.remove(
                "fa-regular"
            );


            icono.classList.add(
                "fa-solid"
            );


            boton.classList.add(
                "favorito-activo"
            );

        } else {

            icono.classList.remove(
                "fa-solid"
            );


            icono.classList.add(
                "fa-regular"
            );


            boton.classList.remove(
                "favorito-activo"
            );

        }

    }
);


/* =========================================================
   MOSTRAR CATÁLOGO INICIAL
========================================================= */

mostrarVestidos(
    vestidos
);


/* =========================================================
   PEDIDO PERSONALIZADO
========================================================= */

const btnPedidoPersonalizado =
    document.getElementById(
        "btnPedidoPersonalizado"
    );


btnPedidoPersonalizado.addEventListener(
    "click",
    () => {

        abrirWhatsApp(
`Hola Drakeford Atelier.

Estoy interesado/a en solicitar un vestido personalizado.

Nombre:
Tipo de evento:
Fecha del evento:
Color deseado:
Talla aproximada:

Tengo una idea o fotografía de referencia y quisiera recibir más información.`
        );

    }
);


/* =========================================================
   ALQUILER
========================================================= */

const btnVerAlquiler =
    document.getElementById(
        "btnVerAlquiler"
    );


const btnConsultarAlquiler =
    document.getElementById(
        "btnConsultarAlquiler"
    );


/* =========================================================
   VER CATÁLOGO DESDE ALQUILER
========================================================= */

btnVerAlquiler.addEventListener(
    "click",
    () => {

        categoriaActual =
            "Todos";


        botonesFiltro.forEach(
            boton => {

                boton.classList.remove(
                    "activo"
                );


                if (
                    boton.dataset.categoria ===
                    "Todos"
                ) {

                    boton.classList.add(
                        "activo"
                    );

                }

            }
        );


        buscadorVestidos.value =
            "";


        aplicarFiltros();


        document
            .getElementById(
                "coleccion"
            )
            .scrollIntoView({
                behavior:
                    "smooth"
            });

    }
);


/* =========================================================
   CONSULTAR ALQUILER
========================================================= */

btnConsultarAlquiler.addEventListener(
    "click",
    () => {

        abrirWhatsApp(
`Hola Drakeford Atelier.

Quisiera recibir información sobre el alquiler de vestidos.

Nombre:
Fecha del evento:
Tipo de evento:
Talla aproximada:

¿Podrían indicarme qué modelos tienen disponibles?`
        );

    }
);


/* =========================================================
   CONTACTO WHATSAPP
========================================================= */

const btnContactoWhatsapp =
    document.getElementById(
        "btnContactoWhatsapp"
    );


btnContactoWhatsapp.addEventListener(
    "click",
    () => {

        abrirWhatsApp(
            "Hola Drakeford Atelier. Quisiera recibir más información."
        );

    }
);


/* =========================================================
   GOOGLE MAPS
========================================================= */

const btnComoLlegar =
    document.getElementById(
        "btnComoLlegar"
    );


btnComoLlegar.addEventListener(
    "click",
    () => {

        const url =
            "https://maps.app.goo.gl/CXAT71qBPJKhGjxT6";


        window.open(
            url,
            "_blank"
        );

    }
);


/* =========================================================
   HEADER AL HACER SCROLL
========================================================= */

const header =
    document.querySelector(
        ".header"
    );


function actualizarHeader() {

    if (
        window.scrollY >
        40
    ) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    actualizarHeader
);


actualizarHeader();


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        `
        .coleccion-encabezado,
        .vestido-card,
        .personalizados-imagen,
        .personalizados-contenido,
        .alquiler-encabezado,
        .paso-alquiler,
        .nosotros-contenido,
        .valor,
        .ubicacion-encabezado,
        .mapa-real,
        .ubicacion-info,
        .contacto-contenido
        `
    );


elementosAnimados.forEach(
    elemento => {

        elemento.classList.add(
            "reveal"
        );

    }
);


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

const observer =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(
                entrada => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target
                            .classList.add(
                                "visible"
                            );


                        observer.unobserve(
                            entrada.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


elementosAnimados.forEach(
    elemento => {

        observer.observe(
            elemento
        );

    }
);


/* =========================================================
   NAVBAR ACTIVA SEGÚN SCROLL
========================================================= */

const secciones =
    document.querySelectorAll(
        "section[id]"
    );


const enlacesNav =
    document.querySelectorAll(
        ".nav a"
    );


function actualizarNavActivo() {

    let seccionActual =
        "";


    secciones.forEach(
        seccion => {

            const posicion =
                seccion.offsetTop -
                140;


            const altura =
                seccion.offsetHeight;


            if (
                window.scrollY >=
                    posicion
                &&
                window.scrollY <
                    posicion +
                    altura
            ) {

                seccionActual =
                    seccion.getAttribute(
                        "id"
                    );

            }

        }
    );


    enlacesNav.forEach(
        enlace => {

            enlace.classList.remove(
                "activo"
            );


            const href =
                enlace.getAttribute(
                    "href"
                );


            if (
                href ===
                `#${seccionActual}`
            ) {

                enlace.classList.add(
                    "activo"
                );

            }

        }
    );

}


/* =========================================================
   EVENTO SCROLL NAVBAR
========================================================= */

window.addEventListener(
    "scroll",
    actualizarNavActivo
);


actualizarNavActivo();


/* =========================================================
   CERRAR MENÚ MÓVIL AL TOCAR UN ENLACE
========================================================= */

enlacesNav.forEach(
    enlace => {

        enlace.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "mostrar"
                );

            }
        );

    }
);