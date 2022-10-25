const pokemonContent = document.getElementById('pokecontent')
const pokemonModal = document.getElementById('pokecontent')
const pokeContainer = document.querySelector('.container')
const form = document.querySelector('.form')
const pokemonRender = 151;

const drawPokemon = async () => {
    for(let i = 1; i <= pokemonRender; i++){
        localStorage.setItem("pokemons", await getPokes(i))
        localStorage.getItem("pokemons")
    }
}
const getPokes = async(id,modal) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const pokemon = await resp.json()
    createPokemon(pokemon,modal)
}

const colors = {
    fire:    '#ff983f',
	grass:   '#38bf4b',
	electric:'#FFE43B',
	water:   '#3393dd',
	ground:  '#CAAC4D',
	rock:    '#90642D',
	poison:  '#9D5B9B',
	bug:     '#84c400',
	dragon:  '#0070ca',
	psychic: '#FF96B5',
	flying:  '#8aabe4',
	fighting:'#FF5D5D',
	normal:  '#929ba3',
    fairy:   '#ed8fe6',
    ghost:   '#4b6ab3',
    ice:     '#4bd2c1',
    dark:    '#5b5366'
}
const mainTypes = Object.keys(colors)

function createPokemon(pokemon,modal){
    const pokemonEl = document.createElement('div')
        pokemonEl.classList.add('pokemon')

    const pokeTypes = pokemon.types.map(types => types.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const color = colors[type]
    const statsHP = pokemon.stats[0].base_stat
    const statsatk = pokemon.stats[1].base_stat
    const statdefense = pokemon.stats[2].base_stat
    const statspecialAtk = pokemon.stats[3].base_stat
    const statspecialDef = pokemon.stats[4].base_stat
    const statSpeed = pokemon.stats[5].base_stat
    const statsTotal = (statsHP + statsatk + statdefense + statspecialAtk + statspecialDef + statSpeed)
    pokemonEl.style.backgroundColor = color
    if(modal !== true){
        const pokeInnerHTML = `<div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
        <div class="info">
        <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Tipo: <span>${pokeTypes.join(' | ')}</span></small>
        </div>`
        pokemonEl.innerHTML = pokeInnerHTML
        pokeContainer.appendChild(pokemonEl)
    } 
    else{
        const pokeInnerHTML = `
            <div class="modal" id="modalPokemon">
                <div class="pokemon">
                    <div class="img-container">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
                    </div>
                        <div class="info">
                            <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
                            <h3 class="name">${name}</h3>
                            <p class="type">Tipo: <span>${pokeTypes.join(' | ')}</span></p>
                            <br>
                            <p class="stats">HP: ${statsHP}</p>
                            <p class="stats">Attack: ${statsatk}</p>
                            <p class="stats">Defense: ${statdefense}</p>
                            <p class="stats">Special-Atk: ${statspecialAtk}</p>
                            <p class="stats">Special-Def: ${statspecialDef}</p>
                            <p class="stats">Speed: ${statSpeed}</p>
                            <p class="stats">Total: ${Math.floor(statsTotal)}</p>
                        </div>            
                </div>
            </div>
        `
        pokemonModal.innerHTML = pokeInnerHTML
    }
}
drawPokemon()
form.addEventListener('submit', e => {
    e.preventDefault();
    let searchPokemon = document.getElementById('search').value.toLowerCase()
    getPokes(searchPokemon,true)
})
function exitModal(){
    const modalPokemon = document.getElementById('modalPokemon');
    modalPokemon.style.display = 'none'
    const reloadPage = document.location.reload()
    setTimeout(() => {
        reloadPage
    }, 100)
    drawPokemon()
}