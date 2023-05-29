const allPokemons = []
const allUrls = []
const divContainerAllPokemons = document.getElementById('div-list')
const limitPokemon = 1279
const button = document.getElementById('button')
const namePokemon = document.getElementById('name')
const hp = document.getElementById('hp')
const input = document.getElementById('input')
const borderCard = document.getElementById('border-card')




// ICONS AND COLORS POKEMONS
const typeImages = {
    normal: 'assets/normal-type.png',
    electric: 'assets/electric-type.png',
    water: 'assets/water-type.png',
    bug: 'assets/bug-type.png',
    grass: 'assets/grass-type.png',
    dark: 'assets/dark-type.png',
    dragon: 'assets/dragon-type.png',
    fairy: 'assets/fairy-type.png',
    fighting: 'assets/fighting-type.png',
    fire: 'assets/fire-type.png',
    flying: 'assets/flying-type.png',
    ghost: 'assets/ghost-type.png',
    ground: 'assets/ground-type.png',
    ice: 'assets/ice-type.png',
    poison: 'assets/poison-type.png',
    psychic: 'assets/psychic-type.png',
    rock: 'assets/rock-type.png',
    steel: 'assets/steel-type.png',
};
// ICONS AND COLORS POKEMONS



fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < limitPokemon; i++) {
            const url = data.results[i].url;
            allUrls.push(url)
        }
        const promises = allUrls.map(url =>
            fetch(url).then(response => response.json())
        )

        Promise.all(promises).then(pokemons => {
            allPokemons.push(...pokemons)


            function searchInput() {
                const searchTerm = input.value.toLowerCase();

                for (let i = 0; i < allPokemons.length; i++) {
                    if (searchTerm == allPokemons[i].name || searchTerm == allPokemons[i].id) {
                        nameAndElement()
                        imgHeightWeight()
                        skills()
                        console.log('Funcionando')
                        break
                    } else if (i === allPokemons.length - 1) {
                        return alert('Pokemon não encontrado')
                    }
                    input.value = ''


                    // NAME, HP AND ELEMENT 
                    function nameAndElement() {
                        namePokemon.textContent = allPokemons[i].name
                        hp.textContent = allPokemons[i].stats[0].base_stat + 'HP'

                        function updatePokemonTypeIcon(element, pokemon) {
                            const type = pokemon
                            const iconPath = typeImages[type];
            
                            const icon = document.createElement('img');
                            icon.src = iconPath
                            icon.style.width = '100%'
                            element.innerHTML = '';
                            element.appendChild(icon);
                        }
                        const element = document.getElementById('element');
                        const type = allPokemons[i].types[0].type.name
                        updatePokemonTypeIcon(element, type);
                        
                    }
                    // NAME, HP AND ELEMENT


                    //IMG, HEIGHT AND WEIGHT
                    function imgHeightWeight() {
                        if (allPokemons[i].sprites.front_default !== null) {
                            const pick = document.getElementById('pick')
                            pick.style.display = 'block'
                            pick.src = allPokemons[i].sprites.front_default
                        } else {
                            const pick = document.getElementById('pick')
                            pick.style.display = 'block'
                            pick.src = allPokemons[i].sprites.official - artwork.front_default
                        }

                       
                        const height = document.getElementById('height-pokemon')
                        const weight = document.getElementById('weight-pokemon')
                        height.innerHTML = 'Height: ' + allPokemons[i].height / 10 + 'm'
                        weight.innerHTML = 'Weight: ' + allPokemons[i].weight / 10 + 'kg'
                    }
                    //IMG, HEIGHT AND WEIGHT

                    //SKILLS
                    function skills() {
                        let habilidades = []
                        let arrayH = []
                        for (let j = 0; j < allPokemons[i].abilities.length; j++) {
                            let urls = allPokemons[i].abilities[j].ability.url
                            habilidades.push(urls)
                        }


                        const promises = habilidades.map(url => fetch(url).then(response => response.json()))

                        Promise.all(promises).then(hab => {
                            arrayH.push(...hab)

                            const nameAbility1 = document.getElementById('name-ability-1')
                            const ability1 = document.getElementById('ability1')
                            const nameAbility2 = document.getElementById('name-ability-2')
                            const ability2 = document.getElementById('ability2')



                            //HABILIDADES POKEMON

                            nameAbility1.innerHTML = arrayH[0].name
                            if(arrayH.length > 1){
                                nameAbility2.innerHTML = arrayH[1].name
                            }
                            for(let i = 0; i < arrayH.length; i++){
                                for(let e = 0; e < arrayH[i].effect_entries.length; e++){
                                    if(arrayH[i].effect_entries[e].language.name == 'en'){
                                        if(i == 0){
                                            ability1.innerHTML = arrayH[i].effect_entries[e].short_effect
                                        } else if(i == 1){
                                            ability2.innerHTML = arrayH[i].effect_entries[e].short_effect
                                        }
                                    }
                                }
                            }
                            //HABILIDADES POKEMON

                        })
                    }
                    //SKILLS
                }
            }
            button.addEventListener('click', searchInput)


            //ALL POKEMONS
            allPokemons.forEach(pokemon => {

                //LISTA COMPLETA DE POKEMONS

                const divPokemon = document.createElement('div')
                const img = document.createElement('img')
                if (pokemon.sprites.front_default !== null) {
                    img.src = pokemon.sprites.front_default
                    divPokemon.appendChild(img)
                    divContainerAllPokemons.appendChild(divPokemon)
                } else {
                    img.src = pokemon.sprites.official - artwork.front_default
                    divPokemon.appendChild(img)
                    divContainerAllPokemons.appendChild(divPokemon)
                }

                //LISTA COMPLETA DE POKEMONS   

                function searchAllPokemons() {
                    nameAndElement()
                    imgHeightWeight()
                    skills()
                }
                divPokemon.addEventListener('click', searchAllPokemons)

                // NAME, HP AND ELEMENT 
                function nameAndElement() {
                    namePokemon.textContent = pokemon.name
                    hp.textContent = pokemon.stats[0].base_stat + 'HP'

                    function updatePokemonTypeIcon(element, pokemon) {
                        const type = pokemon
                        const iconPath = typeImages[type];

                        const icon = document.createElement('img');
                        icon.src = iconPath
                        icon.style.width = '100%'
                        element.innerHTML = '';
                        element.appendChild(icon);
                    }
                    const element = document.getElementById('element');
                    const type = pokemon.types[0].type.name
                    updatePokemonTypeIcon(element, type);
                }
                // NAME, HP AND ELEMENT

                //IMG, HEIGHT AND WEIGHT
                function imgHeightWeight() {
                    if (pokemon.sprites.front_default !== null) {
                        const pick = document.getElementById('pick')
                        pick.style.display = 'block'
                        pick.src = pokemon.sprites.front_default
                    } else {
                        const pick = document.getElementById('pick')
                        pick.style.display = 'block'
                        pick.src = pokemon.sprites.official - artwork.front_default
                    }

                    const height = document.getElementById('height-pokemon')
                    const weight = document.getElementById('weight-pokemon')
                    height.innerHTML = 'Height: ' + pokemon.height / 10 + 'm'
                    weight.innerHTML = 'Weight: ' + pokemon.weight / 10 + 'kg'
                }
                //IMG, HEIGHT AND WEIGHT

                //SKILLS
                function skills() {
                    let habilidades = []
                    let arrayH = []
                    for (let j = 0; j < pokemon.abilities.length; j++) {
                        let urls = pokemon.abilities[j].ability.url
                        habilidades.push(urls)
                    }


                    const promises = habilidades.map(url => fetch(url).then(response => response.json()))

                    Promise.all(promises).then(hab => {
                        arrayH.push(...hab)

                        const nameAbility1 = document.getElementById('name-ability-1')
                        const ability1 = document.getElementById('ability1')
                        const nameAbility2 = document.getElementById('name-ability-2')
                        const ability2 = document.getElementById('ability2')

                            nameAbility1.innerHTML = arrayH[0].name
                            if(arrayH.length > 1){
                                nameAbility2.innerHTML = arrayH[1].name
                            } else{
                                nameAbility2.innerHTML = null
                                ability2.innerHTML = null
                            }
                            for(let i = 0; i < arrayH.length; i++){
                                for(let e = 0; e < arrayH[i].effect_entries.length; e++){
                                    if(arrayH[i].effect_entries[e].language.name == 'en'){
                                        if(i == 0){
                                            ability1.innerHTML = arrayH[i].effect_entries[e].short_effect
                                        } else if(i == 1){
                                            ability2.innerHTML = arrayH[i].effect_entries[e].short_effect
                                        }
                                    }
                                }
                            }
                    })
                }
                //SKILLS

            })
        })
    }).catch(err => {
        console.log(err)
        alert('Erro ao consultar dados, tente novamente mais tarde')
    })
    //ALL POKEMONS

