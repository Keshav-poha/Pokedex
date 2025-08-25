let currentPokemonId = 1;

async function loadPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();
        
        document.getElementById('pokemon-sprite').src = pokemon.sprites.front_default;
        document.getElementById('pokemon-name').textContent = pokemon.name;
        document.getElementById('pokemon-id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    } catch (error) {
        console.error('Error loading Pokemon:', error);
    }
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        loadPokemon(currentPokemonId);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPokemonId < 1010) {
        currentPokemonId++;
        loadPokemon(currentPokemonId);
    }
});

loadPokemon(currentPokemonId);