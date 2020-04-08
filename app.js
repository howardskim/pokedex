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

fetch('https://pokeapi.co/api/v2/pokemon/1').then(res => res.json().then((data) => {
    console.log(data)
    mainScreen.classList.remove('hide');
    let { height, id, name, order, weight, types, stats, sprites, forms, abilities } = data;
    let { back_default:back, front_default:front } = sprites;
    let firstType = types[0];
    let secondType = types[1];
    if(secondType){
        pokeTypeTwo.textContent = secondType.type.name;
    }
    // pokeTypeTwo.textContent = 'test'
    pokeName.textContent = name
    pokeId.textContent = id;
    pokeWeight.textContent = weight;
    pokeHeight.textContent = height;
    pokeFrontImage.src = front;
    pokeBackImage.src = back;
}))