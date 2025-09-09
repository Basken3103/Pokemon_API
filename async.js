const wrapper = document.querySelector("#wrapper")
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`

const nextprevWrapper = /*html*/ `<div id="nextprevWrapper"></div>`
wrapper.insertAdjacentHTML("beforebegin", nextprevWrapper)
const nextprevDom = document.querySelector("#nextprevWrapper")

async function getPokemonsAsy(offset, limit) {
    url = `${baseUrl}?offset=${offset}&limit=${limit}`

    const result = await fetch(url)
    const data = await result.json()
    getPokemons(data)
}



function getPokemons(data) {
    wrapper.innerHTML = ""
    nextprev(data);
    handleNextPrevLink()

    data.results.map((element) => {
        const url = element.url
        fetch(url).then((result) => result.json()).then((data) => {
            console.log(data);

            displayPokemon(data)


        })
    })

}
function displayPokemon(data) {


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

function nextprev(data) {


    const next = data.next
    const prev = data.previous
    nextprevDom.innerHTML = ""
    const nextprevTemplate =/*html*/ `
       <ul>
           ${data.previous ? /*html*/ `<li><a href="${data.previous}">PREVIOUS</a></li>` : /*html*/ `<li>PREVIOUS</li>`}
           ${data.next ? /*html*/ `<li><a href="${data.next}">NEXT</a></li>` : /*html*/ `<li>NEXT</li>`}

           
        </ul>
    `
    nextprevDom.insertAdjacentHTML("beforeend", nextprevTemplate)

    console.log(next, prev);

}

function handleNextPrevLink() {
    nextprevDom.addEventListener("click", handleClick)
}

function handleClick(event) {
    event.preventDefault()
    if (!event.target.href) return


    console.log(event.target.href);
    const url = new URL(event.target.href)
    const params = new URLSearchParams(url.search)
    const limit = params.get("limit")
    const offset = params.get("offset")
    console.log(limit);
    console.log(offset);

    getPokemonsAsy(offset, limit)


}

getPokemonsAsy(0, 20)

// Nået til pokemon video 4.