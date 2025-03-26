const apiKey = "";

const btnAgregar = document.getElementById('btn_agregar');
const inputCiudad = document.getElementById('campo_ciudad');
const listaCiudades = document.getElementById('ciudades-lista');

function crearCard(ciudadNombre) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = ciudadNombre;
    card.appendChild(cardHeader);

    const labelTemp = document.createElement('p');
    labelTemp.textContent = "Temperatura: ";
    card.appendChild(labelTemp);

    const labelDesc = document.createElement('p');
    labelDesc.textContent = "Descripción: ";
    card.appendChild(labelDesc);

    const labelHumedad = document.createElement('p');
    labelHumedad.textContent = "Humedad: ";
    card.appendChild(labelHumedad);

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('editar');
    btnEditar.textContent = "Editar";
    card.appendChild(btnEditar);

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('eliminar');
    btnEliminar.textContent = "Eliminar";
    card.appendChild(btnEliminar);


    btnEliminar.addEventListener('click', () => {
        card.remove();
    });

    btnEditar.addEventListener('click', () => {
        const nuevoNombre = prompt("Ingresa el nuevo nombre de la ciudad", ciudadNombre);
        if (nuevoNombre && nuevoNombre !== ciudadNombre) {
            cardHeader.textContent = nuevoNombre;
            consultarClima(nuevoNombre, card);
        }
    });

    consultarClima(ciudadNombre, card);


    return card;
}

btnAgregar.addEventListener('click', () => {
    const ciudadNombre = inputCiudad.value.trim();

    if (ciudadNombre !== "") {
        const nuevaCiudadCard = crearCard(ciudadNombre);
        listaCiudades.appendChild(nuevaCiudadCard);
        inputCiudad.value = "";
        consultarClima(ciudadNombre, nuevaCiudadCard);
    }
});

async function consultarClima(ciudad, card) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}&lang=es`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
        const labelTemp = card.querySelector('p:nth-child(2)');
        const labelDesc = card.querySelector('p:nth-child(3)');
        const labelHumedad = card.querySelector('p:nth-child(4)');

        labelTemp.textContent = `Temperatura: ${data.main.temp}°C`;
        labelDesc.textContent = `Descripción: ${data.weather[0].description}`;
        labelHumedad.textContent = `Humedad: ${data.main.humidity}%`;
    }

}

const ciudadesIniciales = ["Hermosillo", "London", "Nueva York"];
ciudadesIniciales.forEach(ciudad => {
    const nuevaCiudadCard = crearCard(ciudad);
    listaCiudades.appendChild(nuevaCiudadCard);
});


