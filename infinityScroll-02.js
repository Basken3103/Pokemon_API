const main = document.querySelector("#main-wrapper")
let last;

async function getPokens(limit, offset) {

    if (last) return
    let params = `?offset=${offset}&limit=${limit}`
    let url = `https://pokeapi.co/api/v2/pokemon${params}`

    try {
        const result = await fetch(url)
        if (!result.ok) {
            throw new Error(`HTTP fejl: ${result.status}`)
        }

        const data = await result.json()
        last = data.next == null // if there is no next one stop

        displayPokemon(data) //
    } catch (err) {
        console.error("Kunne ikke hente Pokemon data:", err.message);

    }

}
function displayPokemon(data) {

    const pokemons = data.results.map(pokemon => {
        const imgIndex = pokemon.url.slice(0, -1).spilt("/").pop()
        const basePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"
        const imgPath = `${basePath}${imgIndex}.png`
        const pokemonTemplate = /*html*/`
        <figure>
            <img src= "${imgPath}" alt="${pokemon.name}" />
            <figcaption><span>${pokemon.name}</span><span class="pokemon-number">${pokemon.name}</span></figcaption> 
        </figure>
    `

        return pokemonTemplate

    }).join("")
    main.insertAdjacentHTML("beforeend", pokemons)
    observeDom()
}

// Er nået til 8:52 video nr. 6 - pokemon.

