const inputSearch = document.querySelector(".input__search");
const form = document.querySelector(".form-pokemon");
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number")
const pokemonName = document.querySelector(".pokemon__name")
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");

/*Função Assíncrona é criada com async e operador await
Se não possuir await e async sempre retorna uma promise
*/ 
const fetchResponse = async (pokemon) => {
    /*Esperando resposta da POKEAPI*/
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        /*Gera um JSON com os dados da resposta*/
        const data = await APIResponse.json();
        return data;

    }
    return null;
}

const renderPokemon = async (pokemon) => {
    pokemonName.textContent = "Loading...";
    pokemonNumber.textContent = ""; 
    
    const data = await fetchResponse(pokemon);
    if(data != null){
        console.log(data)

        pokemonImage.style.display = "block"
        pokemonName.textContent = data.name;
        pokemonNumber.textContent = data.id;
    
        /*Quando não pode digitar caracteres especiais do JSON, utilize colchetes e o respectivo nome entre aspas*/
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;

    }
    else{
        alert("Valor Não Encontrado")
        pokemonImage.style.display = "none"
        pokemonName.textContent = "Not found!"
    }

}


/*Como fazer para renderizar o próximo

*/
/*Sem async e Await é uma promise*/

/*O evento de SUbmit deve estar ligado ao form não ao input*/
form.addEventListener("submit", (event) => {
    /*Previne o comportamento inicial do form, de enviar dados*/
    event.preventDefault();
    let inputValue = inputSearch.value;
    renderPokemon(inputValue.toLowerCase())
    console.log("Fazendo submit...")

    inputSearch.value = "";
})

function proximoPokemon(){
    let numberPokemon = +pokemonNumber.textContent;
    numberPokemon++;
    pokemonNumber.textContent = numberPokemon;
    renderPokemon(numberPokemon)
}

function anteriorPokemon(){
    let numberPokemon = +pokemonNumber.textContent;
    if(numberPokemon - 1 > 0){
        numberPokemon--;
        pokemonNumber.textContent = numberPokemon;
        renderPokemon(numberPokemon);
    }
    else{
        alert("Limite negativo foi alcançado")
    }
}

nextBtn.addEventListener("click", proximoPokemon);
prevBtn.addEventListener("click", anteriorPokemon);
// inputSearch.addEventListener("submit", () => {
//     console.log(inputSearch.value);
//     renderPokemon(inputSearch.value)
// })

