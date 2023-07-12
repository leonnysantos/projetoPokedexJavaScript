const pokeForm = document.querySelector('.form');
const pokeInput = document.querySelector('.input-search');
const pokeImg = document.querySelector('.pokemon-image');
const pokeNum = document.querySelector('.pokemon-number');
const pokeName = document.querySelector('.pokemon-name');
const btnPrev = document.querySelector('.button.btn-prev');
const btnNext = document.querySelector('.button.btn-next');

let pokeCount = 1;

const getPokemon = async (pokemon) => {
    const pokeUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (pokeUrl.status === 200) {
        const dados = await pokeUrl.json();
        return dados;
    }
}

const searchPokemon = async (pokemon) => {
    pokeName.innerHTML = 'Carregando...';
    pokeNum.innerHTML = '';

    const dados = await getPokemon(pokemon);

    if (dados) {
        if (pokeCount < 650) {
            pokeImg.style.display = 'block';
            pokeName.innerHTML = dados.name;
            pokeNum.innerHTML = dados.id;
            pokeImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokeInput.value = '';
            pokeCount = dados.id;
        } else {
            pokeImg.style.display = 'block';
            pokeName.innerHTML = dados.name;
            pokeNum.innerHTML = dados.id;
            pokeImg.src = dados['sprites']['other']['official-artwork']['front_default'];
            pokeInput.value = '';
            pokeCount = dados.id;
        }
    } else {
        pokeImg.style.display = 'none';
        pokeName.innerHTML = 'Nada aqui :(';
        pokeNum.innerHTML = '';
        pokeInput.value = '';
    }
}

pokeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchPokemon(pokeInput.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if (pokeCount > 1) {
        pokeCount -= 1;
        searchPokemon(pokeCount);
    }
});

btnNext.addEventListener('click', () => {
    if (pokeCount < 1010) {
        pokeCount += 1;
        searchPokemon(pokeCount);
    }
});

searchPokemon(pokeCount);