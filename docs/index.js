
const root = document.getElementById('root')
const link = document.querySelector('.links')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const bprev = document.querySelectorAll('.page-item')[0]
const bnext = document.querySelectorAll('.page-item')[1]

const pag = {}
root.innerHTML = `<li class="l-style"><img src="/assets/images/loader.svg" alt="Cargando"></li>`

document.addEventListener('DOMContentLoaded', () => {
    load('https://pokeapi.co/api/v2/pokemon/')
})

bnext.addEventListener('click',() => {
    root.innerHTML = `<li class="l-style"><img src="/assets/images/loader.svg" alt="Cargando"></li>`
    load(pag[1])
})
bprev.addEventListener('click',() => {
    
    if(pag[0]==null){
        console.log('null')
    }else{
        root.innerHTML = `<li class="l-style"><img src="/assets/images/loader.svg" alt="Cargando"></li>`
        load(pag[0])
    }


})

const load = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        //console.log(data)
        const {next,previous} = data
        pag[1] = next
        pag[0] = previous
       
        root.innerHTML = ''
        data.results.forEach(element => {
            read(element.url)
    
        });

    } catch (error) {
        
    }
}

const read = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        //console.log(data)
        
        pintarCards(data)

    } catch (error) {
        
    }
}

const pintarCards = (data) => {
    
    templateCard.querySelector('img').setAttribute('src',data.sprites.other.dream_world.front_default)
    templateCard.querySelector('.h6 span').textContent = data.id
    templateCard.querySelector('h5').textContent = data.name
    
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
    root.appendChild(fragment)
}