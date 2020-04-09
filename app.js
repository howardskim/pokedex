//Cache Dom;
let mainScreen = document.querySelector('.main-screen');
let pokeName = document.querySelector('.poke-name')
let pokeId = document.querySelector('.poke-id')
let pokeFrontImage = document.querySelector('.poke-front-image')
let pokeBackImage = document.querySelector('.poke-back-image')
let pokeTypeOne = document.querySelector('.poke-type-one')
let pokeTypeTwo = document.querySelector('.poke-type-two')
let pokeWeight = document.querySelector('.poke-weight')
let pokeHeight = document.querySelector('.poke-height')
let pokeListItems = document.querySelectorAll('.list-item')
let prevButton = document.querySelector('.left-button');
let nextButton = document.querySelector('.right-button');

//Constants and Helper FUnctions
const typeArray = [  
    'normal', 
    'fighting', 
    'flying', 
    'poison', 
    'ground', 
    'rock', 
    'bug', 
    'ghost', 
    'steel', 
    'fire', 
    'water', 
    'grass', 
    'electric', 
    'psychic', 
    'ice', 
    'dragon', 
    'dark', 
    'fairy'
]
let prevUrl = null;
let nextUrl = null;
let currentPokemon = null;

let capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

let resetScreen = () => {
    mainScreen.classList.remove('hide');
    for(let type of typeArray){
        mainScreen.classList.remove(type);
    }
}


let displayPokemon = (url) => {
    if(!url) return;
    fetch(url).then(res => res.json().then((data) => {
        resetScreen();
        let { height, id, name, order, weight, types, stats, sprites, forms, abilities } = data;
        let { back_default: back, front_default: front } = sprites;
        let firstType = types[0];
        let secondType = types[1];
        pokeTypeOne.textContent = capitalize(firstType.type.name)
        if (secondType) {
            pokeTypeTwo.textContent = capitalize(secondType.type.name);
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        };
        mainScreen.classList.add(firstType.type.name)
        pokeName.textContent = capitalize(name)
        pokeId.textContent = '#' + id.toString().padStart(3, '0');
        pokeWeight.textContent = weight;
        pokeHeight.textContent = height;
        pokeFrontImage.src = front || '';
        pokeBackImage.src = back || '';
    }));
}

let fetchData = (url) => {
    fetch(url).then(res => res.json().then((data) => {
        let { results, next, previous } = data;
        prevUrl = previous;
        nextUrl = next;
        for (let i = 0; i < pokeListItems.length; i++) {
            let pokeListItem = pokeListItems[i];
            let resultData = results[i];
            if (resultData) {
                let { name, url } = resultData;
                let linkArray = url.split('/');
                let pokemonNum = linkArray[6]
                pokeListItem.textContent = pokemonNum + '.' + ' ' + capitalize(name);
            } else {
                pokeListItem.textContent = ''
            }
        }
    }))
}


let handlePrevious = () => {
    if(!prevUrl) return;
    fetchData(prevUrl);
};
let handleNext = () => {
    if(!nextUrl) return;
    fetchData(nextUrl)

}
let changePokemon = (e) => {
    if (!e.target.textContent) return;
    let id = e.target.textContent.split('.')[0];
    if (!id) return;
    displayPokemon('https://pokeapi.co/api/v2/pokemon/' + id)
}
fetchData('http://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
displayPokemon(currentPokemon)
prevButton.addEventListener('click', handlePrevious);
nextButton.addEventListener('click', handleNext);
for(let div of pokeListItems){
    div.addEventListener('click', changePokemon)
}