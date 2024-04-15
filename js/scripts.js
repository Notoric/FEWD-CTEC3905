let controller = new AbortController(); // Reference[1] https://levelup.gitconnected.com/asynchronous-tasks-got-you-down-heres-how-to-cancel-them-480801e69ae5
let signal = controller.signal;

// COLOUR PICKER BACKGROUND

function changeBackground(R, G, B) {
    const colours = [
        [255, 255, 255],
        [210, 100, 110],
        [90, 65, 125],
        [210, 160, 100],
        [220, 100, 15],
        [210, 15, 0],
        [100, 125, 150],
        [100, 140, 90],
        [20, 40, 20],
        [220, 140, 180],
        [0, 0, 0],
        [0, 140, 220],
        [0, 255, 160],
        [60, 90, 20]
    ]
    
    let closestDistance = 500;
    let closest = 0;

    for (let i = 0; i < colours.length; i++) {
        distance = Math.abs(R - colours[i][0]) + 
                   Math.abs(G - colours[i][1]) + 
                   Math.abs(B - colours[i][2]);

        if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
        }
    }

    switch (closest) {
        case 0:
            transitionFog();
            break;
        case 1:
            transitionSunset();
            break;
        case 2:
            transitionSunsetPurple();
            break;
        case 3:
            transitionSunsetYellow();
            break;
        case 4:
            transitionRoadOrange();
            break;
        case 5:
            transitionRoadRed();
            break;
        case 6:
            transitionClouds();
            break;
        case 7:
            transitionForest();
            break;
        case 8:
            transitionAvenue();
            break;
        case 9:
            transitionMountain();
            break;
        case 10:
            transitionGalaxy();
            break;
        case 11:
            transitionThunderstorm();
            break;
        case 12:
            transitionAurora();
            break;
        case 13:
            transitionLake();
            break;
        default:
            transitionFog();
            break;
    }
}

bgColour.addEventListener("input", () => {
    const R = parseInt(bgColour.value.substring(1, 3), 16);
    const G = parseInt(bgColour.value.substring(3, 5), 16);
    const B = parseInt(bgColour.value.substring(5, 7), 16);
    changeBackground(R, G, B);
    localStorage.setItem("bgColour", bgColour.value);
    document.documentElement.style.setProperty("--bgColor", bgColour.value);
});

function transitionBackground(newUrl, blackwhite) {
    const background = document.getElementById("background");
    const transitionLayer = document.getElementById("background-transition");
    const title = document.getElementById("titleBanner");

    transitionLayer.removeEventListener("transitionend", () => {});

    title.className = blackwhite;

    transitionLayer.style.background = `url(${newUrl}) 50% 50% / cover`;
    transitionLayer.style.display = "block";
    transitionLayer.style.opacity = "0";

    setTimeout(() => {
        transitionLayer.style.opacity = '0'; 
    }, 10);
    setTimeout(() => {
        transitionLayer.style.opacity = '1'; 
    }, 10);

    transitionLayer.addEventListener("transitionend", () => {
        background.style.background = `url(${newUrl}) 50% 50% / cover`;
        transitionLayer.style.display = "none";
        transitionLayer.style.opacity = "0";
    }, {once: true});
}

function transitionFog() {
    transitionBackground("assets/photos/fog-8519076-nordseher.jpg", "black");
}

function transitionSunset() {
    transitionBackground("assets/photos/sunset-5928907-lizzymay.jpg", "white");
}

function transitionSunsetPurple() {
    transitionBackground("assets/photos/sunset-1373171.jpg", "black");
}

function transitionSunsetYellow() {
    transitionBackground("assets/photos/sunset-404072.jpg", "black");
}

function transitionRoadOrange() {
    transitionBackground("assets/photos/road-1072821.jpg", "white");
}

function transitionRoadRed() {
    transitionBackground("assets/photos/road-8395119.jpg", "white");
}

function transitionClouds() {
    transitionBackground("assets/photos/clouds-8459053.jpg", "black");
}

function transitionForest() {
    transitionBackground("assets/photos/forest-3622519.jpg", "black");
}

function transitionAvenue() {
    transitionBackground("assets/photos/avenue-815297.jpg", "black");
}

function transitionMountain() {
    transitionBackground("assets/photos/mountain-landscape-2031539.jpg", "black");
}

function transitionGalaxy() {
    transitionBackground("assets/photos/milky-way-1845068.jpg", "white");
}

function transitionThunderstorm() {
    transitionBackground("assets/photos/thunderstorm-3625405.jpg", "black");
}

function transitionAurora() {
    transitionBackground("assets/photos/aurora-1197753.jpg", "black");
}

function transitionLake() {
    transitionBackground("assets/photos/hintersee-3601004.jpg", "white");
}

// POKEDEX

async function initPokedex() {
    await populateGenerations();
    await populateTypes();
    populatePokedex(signal);
}

async function populateGenerations() {
    const container = document.getElementById("generation-selector");
    const url = "https://pokeapi.co/api/v2/generation/";
    const response = await fetch(url);
    const data = await response.json();

    let generations = [];
    let generationsURL = [];
    
    const genArray = data.results;
    for (let i = 0; i < genArray.length; i++) {
        const gen = genArray[i];
        const genName = gen.name;
        const genId = genName.split("-")[1].toUpperCase();
        generations.push(genId);
        generationsURL.push(gen.url);
    }
    
    for (let i = 0; i < generations.length; i++) {
        const gen = generations[i];
        const genButton = document.createElement("input");
        genButton.type = "checkbox";
        genButton.value = generationsURL[i];
        genButton.id = `gen${gen}`;
        genButton.checked = true;
        container.appendChild(genButton);
        const genLabel = document.createElement("label");
        genLabel.htmlFor = `gen${gen}`;
        genLabel.innerHTML = `${gen}`;
        container.appendChild(genLabel);
    }
}

function getSelectedGenerations() {
    const container = document.getElementById("generation-selector");
    const checkboxes = container.getElementsByTagName("input");
    let selected = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected.push(checkboxes[i].value);
        }
    }

    return(selected);
}

async function populateTypes() {
    const container = document.getElementById("type-selector");
    const url = "https://pokeapi.co/api/v2/type";
    const response = await fetch(url);
    const data = await response.json();

    let types = [];
    
    const typeArray = data.results;
    for (let i = 0; i < typeArray.length; i++) {
        const type = typeArray[i];
        const typeResponse = await fetch(type.url);
        const typeData = await typeResponse.json();
        if (typeData.id < 1000) {
            types.push(type.name);
        }
    }
    
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        const typeButton = document.createElement("input");
        typeButton.type = "checkbox";
        typeButton.value = type;
        typeButton.id = type;
        typeButton.checked = true;
        container.appendChild(typeButton);

        const typeImg = document.createElement("img");
        typeImg.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type}.svg`;
        typeImg.alt = `${type}`;

        const typeLabel = document.createElement("label");
        typeLabel.htmlFor = type;
        typeLabel.appendChild(typeImg);
        container.appendChild(typeLabel);
    }
}

function getSelectedTypes() {
    const container = document.getElementById("type-selector");
    const checkboxes = container.getElementsByTagName("input");
    let selected = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected.push(checkboxes[i].value);
        }
    }

    return selected;
}

async function populatePokedex(signal) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";
    const types = await getSelectedTypes();
    const generations = await getSelectedGenerations();
    for (let i = 0; i < generations.length; i++) {
        if (signal.aborted) {
            return;
        }
        const url = generations[i];
        const response = await fetch(url);
        const data = await response.json();
        const pokemon = data.pokemon_species;
        for (let j = 0; j < pokemon.length; j++) {
            if (signal.aborted) {
                return;
            }
            const poke = pokemon[j];
            const speciesURL = poke.url;
            const speciesResponse = await fetch(speciesURL);
            const speciesData = await speciesResponse.json();
            const varieties = speciesData.varieties;
            for (let k = 0; k < varieties.length; k++) {
                if (signal.aborted) {
                    return;
                }
                const variety = varieties[k];
                const varietyURL = variety.pokemon.url;
                const varietyResponse = await fetch(varietyURL);
                const varietyData = await varietyResponse.json();
                const varietyTypes = varietyData.types;
                if (types.includes(varietyTypes[0].type.name)) {
                    if (signal.aborted) {
                        return;
                    }
                    addPokemon(varietyData);
                } else {
                    try {
                        if (types.includes(varietyTypes[1].type.name)) {
                            if (signal.aborted) {
                                return;
                            }
                            addPokemon(varietyData);
                        }
                    } catch {
                        //no second type
                    }
                }
            }
        }
    }
}

function addPokemon(pokemonData) {
    const container = document.getElementById("pokemon-container");

    // if (container.childElementCount > 100) {
    //     return;
    // }

    const pokemon = document.createElement("div");
    pokemon.className = "pokemon-card";
    pokemon.classList.add(pokemonData.types[0].type.name + "-primary-type");
    if (pokemonData.types[1]) {
        pokemon.classList.add(pokemonData.types[1].type.name + "-secondary-type");
    }
    pokemon.id = pokemonData.name;

    const pokemonName = document.createElement("p");
    pokemonName.className = "pokemon-name";
    let formatedName = "";
    pokemonData.name.split("-").forEach((word) => { 
        formatedName += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    if (formatedName.length > 20) {
        formatedName = formatedName.slice(0, formatedName.length - 1);
        formatedName = formatedName.slice(0, formatedName.lastIndexOf(" "));
    }
    pokemonName.innerHTML = formatedName;
    pokemon.appendChild(pokemonName);

    const pokemonId = document.createElement("p");
    pokemonId.className = "pokemon-id";
    pokemonId.innerHTML = `#${pokemonData.id}`;
    pokemon.style.order = pokemonData.id;
    pokemon.appendChild(pokemonId);

    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokemonData.sprites.front_default;
    pokemonImg.alt = pokemonData.name;
    pokemon.appendChild(pokemonImg);

    pokemon.addEventListener("click", () => {
        const id = pokemonData.id;
        createPokemonDisplay(id);
    });

    container.appendChild(pokemon);
}

const generationSelector = document.getElementById("generation-selector");
generationSelector.addEventListener("change", (event) => {
    restartPokedexUpdate();
});

const typeSelector = document.getElementById("type-selector");
typeSelector.addEventListener("change", (event) => {
    restartPokedexUpdate();
});

function restartPokedexUpdate() {
    controller.abort();
    setTimeout(() => {
        controller = new AbortController();
        signal = controller.signal;
        populatePokedex(signal);
    }, 250);
}

async function createPokemonDisplay(id) {
    const fullscreenContainer = document.getElementById("fullscreen");
    fullscreenContainer.className = "visible";

    const pokemonDisplay = document.createElement("div");
    pokemonDisplay.id = "pokemon-display";

    const closeButton = document.createElement("button");
    closeButton.id = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", () => {
        closePokemonDisplay();
    });

    fullscreenContainer.addEventListener("click", (event) => {
        if (event.target.id === "fullscreen") {
            closePokemonDisplay();
        }
    });

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    
    pokemonDisplay.className = data.types[0].type.name + "-primary-type"

    const pokemonName = document.createElement("p");
    pokemonName.className = "pokemon-name";

    let formatedName = "";
    data.name.split("-").forEach((word) => {
        formatedName += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    formatedName = formatedName.slice(0, formatedName.length - 1);

    pokemonName.innerHTML = formatedName;

    const pokemonId = document.createElement("p");
    pokemonId.className = "pokemon-id";
    pokemonId.innerHTML = `#${data.id}`;

    const pokemonImg = document.createElement("img");
    pokemonImg.src = data.sprites.other["official-artwork"].front_default;
    pokemonImg.alt = data.name;
    const pokemonImgContainer = document.createElement("div");
    pokemonImgContainer.id = "image-container";
    pokemonImgContainer.appendChild(pokemonImg);

    const pokemonStatblock = document.createElement("div");
    pokemonStatblock.id = "statblock";

    data.stats.forEach((stat) => {
        const statBar = document.createElement("div");
        statBar.className = "stat-bar";
        statBar.id = stat.stat.name;
        const statName = document.createElement("p");
        statName.className = "stat-name";
        let formatedStatName = "";
        stat.stat.name.split("-").forEach((word) => {
            formatedStatName += word.charAt(0).toUpperCase() + word.slice(1) + " ";
        });
        formatedStatName = formatedStatName.slice(0, formatedStatName.length - 1);

        statName.innerHTML = formatedStatName;
        const statValue = document.createElement("p");
        statValue.className = "stat-value";
        statValue.innerHTML = stat.base_stat;

        const statGraphic = document.createElement("p");
        statGraphic.className = "stat-graphic";
        let stringFilled = document.createElement("span");
        let stringEmpty = document.createElement("span");

        const barSize = 25;

        const baseStat = (stat.base_stat / 255) * barSize;
        const emptyStat = barSize - baseStat;

        stringFilled.innerHTML = "❚".repeat(baseStat);
        stringEmpty.innerHTML = "❚".repeat(emptyStat);

        stringFilled.className = "stat-filled";
        stringEmpty.className = "stat-empty";

        statGraphic.appendChild(stringFilled);
        statGraphic.appendChild(stringEmpty);

        statBar.appendChild(statGraphic);
        statBar.appendChild(statName);
        statBar.appendChild(statValue);
        pokemonStatblock.appendChild(statBar);
    });

    const imageAndStats = document.createElement("div");
    imageAndStats.id = "image-and-stats";
    imageAndStats.appendChild(pokemonImgContainer);
    imageAndStats.appendChild(pokemonStatblock);

    pokemonDisplay.appendChild(pokemonName);
    pokemonDisplay.appendChild(pokemonId);
    pokemonDisplay.appendChild(imageAndStats);

    fullscreenContainer.appendChild(pokemonDisplay);
    fullscreenContainer.appendChild(closeButton);
}

function closePokemonDisplay() {
    const fullscreenContainer = document.getElementById("fullscreen");
    fullscreenContainer.className = "";
    const children = Array.from(fullscreenContainer.children);
    children.forEach((child) => {
        fullscreenContainer.removeChild(child);
    });

}

// ACCORDIAN IMAGES

function carouselExpand(i) {
    const carousel = document.getElementById(`carousel-container`);
    const carouselItems = carousel.getElementsByClassName("carousel-item");

    i = i - 1;

    if (i < carouselItems.length) {
        for (let j = 0; j < carouselItems.length; j++) {
            carouselItems[j].className = "carousel-item";
        }
        carouselItems[i].className = "carousel-item active";
    }
}

function initCarousel() {
    const carousel = document.getElementById(`carousel-container`);
    const carouselItems = carousel.getElementsByClassName("carousel-item");

    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].addEventListener("mouseover", () => {
            carouselExpand(i + 1);
        });
    }

}

// INITIALIZATION
// Set background colour to last saved value
const bgColor = document.getElementById("bgColour");
bgColor.value = localStorage.getItem("bgColour") || "#ff0070";
const initR = parseInt(bgColour.value.substring(1, 3), 16);
const initG = parseInt(bgColour.value.substring(3, 5), 16);
const initB = parseInt(bgColour.value.substring(5, 7), 16);
changeBackground(initR, initG, initB);
document.documentElement.style.setProperty("--bgColor", bgColour.value);
// Initialize carousel
initCarousel();
carouselExpand(1);
// Initialize pokedex
initPokedex();

function handleMouseMove(event) {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    
    const xAbsolute = event.clientX / width;
    const yAbsolute = event.clientY / height;
    
    const maxOffset = 40;
    const xOffset = (xAbsolute * (2 * maxOffset)) - maxOffset;
    const yOffset = (yAbsolute * (2 * maxOffset)) - maxOffset;
    
    document.body.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
  }
  
