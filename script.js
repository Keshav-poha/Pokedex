let currentPokemonId = 1;

function loadPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            showBasicInfo(pokemon);
            showTypes(pokemon);
            showStats(pokemon);
            showAbilities(pokemon);
            showBaseStats(pokemon);
        })
        .catch(error => {
            console.log('Error loading Pokemon:', error);
            document.getElementById('pokemon-name').textContent = 'Error loading Pokemon';
        });
}

function showBasicInfo(pokemon) {
    document.getElementById('pokemon-sprite').src = pokemon.sprites.front_default;
    document.getElementById('pokemon-name').textContent = pokemon.name;
    
    let pokemonNumber = pokemon.id.toString().padStart(3, '0');
    document.getElementById('pokemon-id').textContent = `#${pokemonNumber}`;
}

function showTypes(pokemon) {
    let typesContainer = document.getElementById('pokemon-types');
    typesContainer.innerHTML = '';
    
    for (let i = 0; i < pokemon.types.length; i++) {
        let typeName = pokemon.types[i].type.name;
        
        let typeElement = document.createElement('span');
        typeElement.className = `type-badge type-${typeName}`;
        typeElement.textContent = typeName;
        
        typesContainer.appendChild(typeElement);
    }
}

function showStats(pokemon) {
    let heightInMeters = pokemon.height / 10;
    document.getElementById('pokemon-height').textContent = heightInMeters + ' m';
    
    let weightInKg = pokemon.weight / 10;
    document.getElementById('pokemon-weight').textContent = weightInKg + ' kg';
    
    let experience = pokemon.base_experience || 'Unknown';
    document.getElementById('pokemon-exp').textContent = experience;
}

function showAbilities(pokemon) {
    let abilitiesContainer = document.getElementById('abilities-list');
    abilitiesContainer.innerHTML = '';
    
    for (let i = 0; i < pokemon.abilities.length; i++) {
        let ability = pokemon.abilities[i];
        let abilityName = ability.ability.name.replace('-', ' ');
        
        let abilityElement = document.createElement('div');
        abilityElement.className = 'ability-item';
        abilityElement.textContent = abilityName;
        
        if (ability.is_hidden) {
            abilityElement.textContent += ' (Hidden)';
            abilityElement.style.fontStyle = 'italic';
        }
        
        abilitiesContainer.appendChild(abilityElement);
    }
}

function showBaseStats(pokemon) {
    let baseStatsContainer = document.getElementById('base-stats');
    baseStatsContainer.innerHTML = '';
    
    let statNames = {
        'hp': 'HP',
        'attack': 'ATK',
        'defense': 'DEF',
        'special-attack': 'SP.ATK',
        'special-defense': 'SP.DEF',
        'speed': 'SPD'
    };
    
    for (let i = 0; i < pokemon.stats.length; i++) {
        let stat = pokemon.stats[i];
        let statName = statNames[stat.stat.name] || stat.stat.name.toUpperCase();
        let statValue = stat.base_stat;
        
        let statElement = document.createElement('div');
        statElement.className = 'stat-bar';
        
        let nameDiv = document.createElement('div');
        nameDiv.className = 'stat-name';
        nameDiv.textContent = statName;
        
        let valueDiv = document.createElement('div');
        valueDiv.className = 'stat-value';
        valueDiv.textContent = statValue;
        
        let barBackground = document.createElement('div');
        barBackground.className = 'stat-bar-bg';
        
        let barFill = document.createElement('div');
        barFill.className = 'stat-bar-fill';
        
        let barWidth = Math.min(statValue / 200 * 100, 100);
        barFill.style.width = barWidth + '%';
        
        barBackground.appendChild(barFill);
        statElement.appendChild(nameDiv);
        statElement.appendChild(valueDiv);
        statElement.appendChild(barBackground);
        
        baseStatsContainer.appendChild(statElement);
    }
}

document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentPokemonId > 1) {
        currentPokemonId = currentPokemonId - 1;
        loadPokemon(currentPokemonId);
    }
});

document.getElementById('next-btn').addEventListener('click', function() {
    if (currentPokemonId < 1010) {
        currentPokemonId = currentPokemonId + 1;
        loadPokemon(currentPokemonId);
    }
});

loadPokemon(currentPokemonId);