const pokemonList = document.getElementById('pokemonList')
const loadBT = document.getElementById('loadMoreBT')
const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit){

    function convertPokemonToLi(pokemon){
        return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.picture}" 
                    alt="${pokemon.name}">
            </div>
        </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then( (pokemons = []) => {
        pokemonList.innerHTML += pokemons.map( convertPokemonToLi ).join('')    
    })
}

loadPokemonItens(offset,limit)

loadBT.addEventListener('click',()=> {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadBT.parentElement.removeChild(loadBT)
    } else {
        loadPokemonItens(offset, limit)
    }
})