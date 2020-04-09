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
let typeArray = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

let capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

let resetScreen = () => {
    mainScreen.classList.remove('hide');
    for(let type of typeArray){
        mainScreen.classList.remove(type);
    }
}
fetch('https://pokeapi.co/api/v2/pokemon/16').then(res => res.json().then((data) => {
    console.log(data)
    resetScreen();
    let { height, id, name, order, weight, types, stats, sprites, forms, abilities } = data;
    let { back_default:back, front_default:front } = sprites;
    let firstType = types[0];
    let secondType = types[1];
    pokeTypeOne.textContent = capitalize(firstType.type.name)
    if(secondType){
        pokeTypeTwo.textContent = capitalize(secondType.type.name);
    } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
    };
    mainScreen.classList.add(firstType.type.name)
    // pokeTypeTwo.textContent = 'test'
    pokeName.textContent = capitalize(name)
    pokeId.textContent = '#' + id.toString().padStart(3, '0');
    pokeWeight.textContent = weight;
    pokeHeight.textContent = height;
    pokeFrontImage.src = front || '';
    pokeBackImage.src = back || '';
}));

fetch('http://pokeapi.co/api/v2/pokemon?offset=0&limit=20').then(res => res.json().then((data) => {
    let { results } = data;
    console.log(results);
    for(let i = 0; i < pokeListItems.length; i++){
        let pokeListItem = pokeListItems[i];
        let resultData = results[i];
        if(resultData){
            let { name, url } = resultData;
            let linkArray = url.split('/');
            let pokemonNum = linkArray[6]
            pokeListItem.textContent = pokemonNum + '.' + ' ' + capitalize(name);
        } else {
            pokeListItem.textContent = ''
        }
    }
}))

prevButton.addEventListener('click', handlePrevious);
nextButton.addEventListener('click', handleNext)