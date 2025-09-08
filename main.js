const wrapper = document.querySelector("#wrapper")
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`

console.log(wrapper);

fetch(baseUrl).then((result) => result.json()).then((data) => { getPokemons(data) });

function getPokemons(data) {
    console.log(data);
    data.results.map((element) => {
        const url = element.url
        fetch(url).then((result) => result.json()).then((data) => {
            console.log(data);
            displayPokemon(data)

        })
    })

}
function displayPokemon(data) {
    console.log(data);

    const imgSrc = data.sprites.other["official-artwork"]["front_default"]
    const spriteTemplate =/*html*/ `
        <figure>
            <img src = "${imgSrc}" >
            <figcaption>${data.name}</figcaption>
        <figure>
    
    `

    wrapper.insertAdjacentHTML("beforeend", spriteTemplate)
    //console.log(data);

}