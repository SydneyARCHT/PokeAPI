
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();
    return pokemonData;
}

function createPokemonCard(pokemonData) {
    const card = document.createElement('div');
    card.className = 'card m-2';
    card.style.width = '18rem';
    

    card.innerHTML = `
        <div class="card-body">
            <h2>${pokemonData.name}</h2> 
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="card-img-top"> 
            <h4>Abilities: </h4>
            <ul>
              ${pokemonData.abilities.map(arrayItem => `<li>${arrayItem.ability.name}</li>`).join('')}
            </ul>
            <h4>Base Experience: </h4>
            <p>${pokemonData.base_experience}</p> 
            <h4>First Move</h4>
            <p>${pokemonData.moves[0].move.name}</p>
        </div>
    `;

    return card;
}

async function handleSubmit(event) {
    event.preventDefault(); 

    const form = event.target;
    const pokemonName = form.pokemonName.value.trim().toLowerCase(); 

    try {
        const pokemonData = await fetchPokemonData(pokemonName);
        const pokemonContainer = document.getElementById('pokemon-container');

        const newCard = createPokemonCard(pokemonData);
        pokemonContainer.appendChild(newCard);
        form.reset();
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        const pokemonContainer = document.getElementById('pokemon-container');
        const errorCard = document.createElement('div');
        errorCard.className = 'card m-2';
        errorCard.style.width = '18rem';

        errorCard.innerHTML = `
            <div class="card-body">
                <p>Pokémon not found. Please try again.</p>
            </div>
        `;

        pokemonContainer.appendChild(errorCard);
    }
}