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
        console.log(data);


        displayPokemon(data) //
    } catch (err) {
        console.error("Kunne ikke hente Pokemon data:", err.message);

    }



}
function displayPokemon(data) {


    const pokemons = data.results.map(pokemon => {
        //console.log(pokemon.url)
        //console.log(pokemon.url.slice(0, -1))
        //console.log(pokemon.url.slice(0, -1))

        const imgIndex = pokemon.url.slice(0, -1).split("/").pop()

        const basePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"
        const imgPath = `${basePath}${imgIndex}.png`


        const pokemonTemplate = /*html*/`
        <figure>
            <img src= "${imgPath}" loading="lazy" alt="${pokemon.name}" />
            <figcaption><span>${pokemon.name}</span><span class="pokemon-number">${pokemon.name}</span></figcaption> 
        </figure>
    `

        return pokemonTemplate

    }).join("")
    main.insertAdjacentHTML("beforeend", pokemons)
    // Find nyt næste element to observe
    figures = main.querySelectorAll("figure")

    console.log(figures[figures.length - 6]);

    const nextObserverElement = figures[figures.length - 6]
    // console.log(nextObserverElement);

    nextObserverElement.classList.add("observer")
    // Flyt observeren til det nye element
    observer.disconnect()
    observer.observe(nextObserverElement)
}

//IntersectionObserver til infinite scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            offset += limit
            getPokens(limit, offset)
        }
    })
}, {
    threshold: 1.0
})

// Første load
let limit = 30
let offset = 0
getPokens(limit, offset)



