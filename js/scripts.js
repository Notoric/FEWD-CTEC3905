console.log("hello");

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
bgColor.value = localStorage.getItem("bgColour") || "#ffffff";
const initR = parseInt(bgColour.value.substring(1, 3), 16);
const initG = parseInt(bgColour.value.substring(3, 5), 16);
const initB = parseInt(bgColour.value.substring(5, 7), 16);
changeBackground(initR, initG, initB);
// Initialize carousel
initCarousel();
carouselExpand(1);