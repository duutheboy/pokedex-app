
//Variáveis globais do pokemon
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

//Formulário de pesquisa
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

//Botões de próximo e anterior
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

//Variável global para armazenar o id do pokemon, começando em 1
let searchPokemon = 1;

//Função assíncrona para capturar os dados da API
const fetchPokemon = async (pokemon) => {
    
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //Gerar pokemon assim que pesquisar 
    if (APIresponse.status === 200) {
        const data = await APIresponse.json();
        return data;
    }

} 


//Função para renderizar o nome, id e gif do pokemon
const renderPokemon = async (pokemon) => {

    //Texto de procurando
    pokemonNumber.innerHTML = ''; 
    pokemonName.innerHTML = 'Searching...';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
    pokemonImage.style.display = 'block';   
    searchPokemon = data.id; 
}
    else {
    pokemonName.innerHTML = "not found :'(";
    pokemonNumber.innerHTML = '';   
    pokemonImage.style.display = 'none';
    }    
}

form.addEventListener('submit', (event) => {

    //Impedir recarregamento da pagina
    event.preventDefault();

    //Passar valor do input de pesquisa na função de renderizar o pokemon
    renderPokemon(input.value.toLowerCase());

    //Limpar input de pesquisa, deixar vazio depois de pesquisar
    input.value = '';
});

//Botão prev
btnPrev.addEventListener('click', () => {
    searchPokemon -=1;
    renderPokemon(searchPokemon);
});

//Botão next
btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


//
renderPokemon(searchPokemon);
