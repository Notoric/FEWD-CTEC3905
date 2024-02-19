console.log("hello");

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
    
}

function transitionBackground(newUrl, blackwhite) {
    const background = document.getElementById("background");
    const transitionLayer = document.getElementById("background-transition");
    const title = document.getElementById("titleBanner");

    title.className = blackwhite;

    transitionLayer.style.background = `url(${newUrl}) 50% 50% / cover`;
    transitionLayer.style.display = "block";
    transitionLayer.style.opacity = "0";

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

transitionBackground("assets/photos/fog-8519076-nordseher.jpg", "black")