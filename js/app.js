const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("mostrar");
});


const numeroWhatsApp = "595971402098";


function abrirWhatsApp(mensaje) {

    const mensajeCodificado = encodeURIComponent(mensaje);

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    window.open(url, "_blank");
}


const btnAgendar = document.getElementById("btnAgendar");

btnAgendar.addEventListener("click", () => {

    abrirWhatsApp(
        `Hola Drakeford Atelier.

Quisiera agendar una cita para conocer y probarme algunos vestidos.

Nombre:
Fecha aproximada:
Tipo de evento:`
    );

});


const whatsappFlotante =
    document.getElementById("whatsappFlotante");


whatsappFlotante.addEventListener("click", (event) => {

    event.preventDefault();

    abrirWhatsApp(
        "Hola Drakeford Atelier. Quisiera recibir más información."
    );

});

const vestidosGrid =
    document.getElementById("vestidosGrid");

const botonesFiltro =
    document.querySelectorAll(".filtro");

const buscadorVestidos =
    document.getElementById("buscadorVestidos");


let categoriaActual = "Todos";


function formatearGuaranies(valor) {

    return new Intl.NumberFormat(
        "es-PY"
    ).format(valor);
}


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


    lista.forEach((vestido) => {

        const tarjeta =
            document.createElement("article");


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

            </div>


            <div class="vestido-info">

                <h3>
                    ${vestido.nombre}
                </h3>

                <p class="vestido-talla">
                    Tallas: ${vestido.talla}
                </p>


                <div class="vestido-precios">

                    <div class="precio">

                        <span>
                            Precio de compra
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


                <div class="vestido-acciones">

                    <button
                        class="btn-vestido btn-detalles"
                        onclick="verDetalles(${vestido.id})"
                    >
                        Ver detalles
                    </button>


                    <button
                        class="btn-vestido btn-reservar"
                        onclick="reservarVestido(${vestido.id})"

                        ${
                            vestido.disponible
                            ? ""
                            : "disabled"
                        }
                    >
                        Reservar
                    </button>

                </div>

            </div>
        `;


        vestidosGrid.appendChild(
            tarjeta
        );

    });

}


function aplicarFiltros() {

    const busqueda =
        buscadorVestidos.value
        .toLowerCase()
        .trim();


    const resultado =
        vestidos.filter((vestido) => {

            const coincideCategoria =
                categoriaActual === "Todos"
                ||
                vestido.categoria
                    === categoriaActual;


            const coincideBusqueda =
                vestido.nombre
                    .toLowerCase()
                    .includes(busqueda);


            return (
                coincideCategoria
                &&
                coincideBusqueda
            );

        });


    mostrarVestidos(resultado);
}


botonesFiltro.forEach((boton) => {

    boton.addEventListener(
        "click",
        () => {

            botonesFiltro.forEach(
                (b) =>
                    b.classList.remove(
                        "activo"
                    )
            );


            boton.classList.add(
                "activo"
            );


            categoriaActual =
                boton.dataset.categoria;


            aplicarFiltros();

        }
    );

});


buscadorVestidos.addEventListener(
    "input",
    aplicarFiltros
);


function reservarVestido(id) {

    const vestido =
        vestidos.find(
            (item) => item.id === id
        );


    if (!vestido) {
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


const modalVestido =
    document.getElementById("modalVestido");

const modalCerrar =
    document.getElementById("modalCerrar");

const modalImagen =
    document.getElementById("modalImagen");

const modalCategoria =
    document.getElementById("modalCategoria");

const modalNombre =
    document.getElementById("modalNombre");

const modalEstado =
    document.getElementById("modalEstado");

const modalPrecioVenta =
    document.getElementById("modalPrecioVenta");

const modalPrecioAlquiler =
    document.getElementById("modalPrecioAlquiler");

const modalTallas =
    document.getElementById("modalTallas");

const modalDescripcion =
    document.getElementById("modalDescripcion");

const modalReservar =
    document.getElementById("modalReservar");


let vestidoSeleccionado = null;


function verDetalles(id) {

    vestidoSeleccionado =
        vestidos.find(
            vestido => vestido.id === id
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


    if (vestidoSeleccionado.disponible) {

        modalEstado.textContent =
            "Disponible";

        modalEstado.classList.remove(
            "reservado"
        );

        modalReservar.disabled = false;

        modalReservar.textContent =
            "Reservar por WhatsApp";

    } else {

        modalEstado.textContent =
            "Actualmente reservado";

        modalEstado.classList.add(
            "reservado"
        );

        modalReservar.disabled = true;

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


function cerrarModalVestido() {

    modalVestido.classList.remove(
        "activo"
    );


    document.body.classList.remove(
        "modal-abierto"
    );

}


modalCerrar.addEventListener(
    "click",
    cerrarModalVestido
);


modalVestido.addEventListener(
    "click",
    event => {

        if (
            event.target === modalVestido
        ) {

            cerrarModalVestido();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            cerrarModalVestido();

        }

    }
);


modalReservar.addEventListener(
    "click",
    () => {

        if (!vestidoSeleccionado) {
            return;
        }


        reservarVestido(
            vestidoSeleccionado.id
        );

    }
);



mostrarVestidos(vestidos);

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

const btnVerAlquiler =
    document.getElementById(
        "btnVerAlquiler"
    );


const btnConsultarAlquiler =
    document.getElementById(
        "btnConsultarAlquiler"
    );


btnVerAlquiler.addEventListener(
    "click",
    () => {

        categoriaActual = "Todos";


        botonesFiltro.forEach(
            boton => {

                boton.classList.remove(
                    "activo"
                );

                if (
                    boton.dataset.categoria
                    === "Todos"
                ) {

                    boton.classList.add(
                        "activo"
                    );

                }

            }
        );


        buscadorVestidos.value = "";


        aplicarFiltros();


        document
            .getElementById("coleccion")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


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