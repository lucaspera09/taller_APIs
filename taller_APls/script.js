const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function buscarReceta() {
    const recetaABuscar = document.getElementById('recetaInput').value;
    const url = `${apiUrl}${recetaABuscar}`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then((data) => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = '';

            if (data.meals && data.meals.length > 0) {
                const recetaEncontrada = data.meals[0];
                const nombre = recetaEncontrada.strMeal;
                const ingredientes = recetaEncontrada.strIngredient1; // Se muestra solo un ingrediente para simplificar
                const instrucciones = recetaEncontrada.strInstructions;

                const nombreElement = document.createElement('h2');
                nombreElement.textContent = `Nombre de la Receta: ${nombre}`;
                resultadoDiv.appendChild(nombreElement);

                const ingredientesElement = document.createElement('p');
                ingredientesElement.textContent = `Ingredientes: ${ingredientes}`;
                resultadoDiv.appendChild(ingredientesElement);

                const instruccionesElement = document.createElement('p');
                instruccionesElement.textContent = `Instrucciones: ${instrucciones}`;
                resultadoDiv.appendChild(instruccionesElement);
            } else {
                resultadoDiv.textContent = `No se encontraron recetas con el nombre '${recetaABuscar}'.`;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const buscarBtn = document.getElementById('buscarBtn');
buscarBtn.addEventListener('click', buscarReceta);
