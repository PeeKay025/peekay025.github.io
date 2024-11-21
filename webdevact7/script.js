var loadingBar = document.getElementById("loadingBar");
var cardContainer = document.getElementById("cardContainer");
var page = 1;

const loadCharacters = async () => {
    cardContainer.innerHTML = "";
    loadingBar.style.width = "0%";
    const response = await fetch(`https://eldenring.fanapis.com/api/npcs?limit=20&page=${page}`);
    const data = await response.json();
    const characters = data.data;

    const totalCharacters = characters.length;

    for (let i = 0; i < totalCharacters; i++) {
        const character = characters[i];

        cardContainer.innerHTML += `
        <div class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="card rounded-5 my-3">
                <div class="imgcontainer">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="character-name">${character.name}</div>
                <div class="character-class">${character.class || "N/A"}</div>
            </div>
        </div>
        `;
        loadingBar.style.width = (((i + 1) / totalCharacters) * 100) + '%';
    }
};

loadCharacters();

function nextPage() {
    page += 1;
    loadCharacters();
}

function prevPage() {
    if (page > 1) {
        page -= 1;
        loadCharacters();
    }
}
