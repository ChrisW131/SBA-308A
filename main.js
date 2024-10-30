// const BASE_URL = "https://gateway.marvel.com/v1/public/"
// const API_KEY = 'd19e3115267042a057effb1204eedf6c'

// let searchInput = document.getElementById("input-box")
// let searchBtn = document.getElementById("search-btn")
// let list = document.querySelector(".list")
// let showContainer = document.getElementById("show-container")

// let date = new Date();
// console.log(date.getTime());

// function displayWords(value) {
//     input.value = value;
//     removeElements();
// }

// function removeElements() {
//     listContainer.innerHTML = "";
// }

// inputValue.addEventListener("keyup", async() => {
//     removeElements();
//     if (input.value.length > 0) {
//         return false; 
//     }

//     const url = `${BASE_URL}characters?name=${inputValue.value}&apikey=${API_KEY}`

//     const response = await fetch(url);
//     const jsonData = await response.json();

//     jsonData.data['results'].forEach((results) => {
//         let name = results.name
//         let div = document.createElement("div");
//         div.style.cursor = "pointer";
//         div.classList.add("autocomplete-items");
//         div.setAttribute("onclick", "displayWords('" + name + "')");
//         let word = "<b>" + name.substr(0, input.value.length) + "</b>";
//         word += name.substr(input.value.length);
//         div.innerHTML = `<p class="item">${word}</p>`;
//         listContainer.appendChild(div);
//     })
// })

// searchBtn.addEventListener("click", (getResults = async () => {
//     if(inputValue.value.trim().length < 1){
//         alert("Please enter a character name")
//     }

//     showContainer.innerHTML = ""
//     const url = `${BASE_URL}characters?name=${inputValue.value}&apikey=${API_KEY}`

//     const response = await fetch(url)
//     const data = await response.json()
//     jsonData.data['results'].forEach((element) => {
//         showContainer.innerHTML += `<div class="card-container">
//         <div class="container-character-image"><img src="${element.thumbnail.path}.${element.thumbnail.extension}"/></div>
//         <div class="container-character-name">${element.name}</div>
//         <div class="container-character-description">${element.description}</div>
//         </div>`
//     })
//     }

// ))

// window.onload = () => {
//     getResults()
// }

const BASE_URL = "https://gateway.marvel.com/v1/public/";
const API_KEY = 'd19e3115267042a057effb1204eedf6c';
const ts = Date.now();

const url = `http://gateway.marvel.com/v1/public/comics?ts=1&apikey=d19e3115267042a057effb1204eedf6c&hash=f3e4e8c1532308d9cc72fc9af4f6d124`;



let searchInput = document.getElementById("input-box");
let searchBtn = document.getElementById("search-btn");
let listContainer = document.querySelector("list");
let showContainer = document.getElementById("show-container");

function displayWords(value) {
    searchInput.value = value;
    removeElements();
}

function removeElements() {
    // listContainer.innerHTML = "";

    if (searchInput.value.length === 0) {
        listContainer.style.display = "none";
    }

}

searchInput.addEventListener("keyup", async () => {
    removeElements();
    if (searchInput.value.length === 0) {
        return;
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=d19e3115267042a057effb1204eedf6c`;


    try {
        const response = await fetch(url);

        console.log(response)
        const jsonData = await response.json();

        if (jsonData.data.results.length > 0) {
            jsonData.data.results.forEach((result) => {
                let name = result.name;
                let div = document.createElement("div");
                div.style.cursor = "pointer";
                div.classList.add("autocomplete-items");
                div.setAttribute("onclick", `displayWords('${name}')`);
                let word = `<b>${name.substr(0, searchInput.value.length)}</b>`;
                word += name.substr(searchInput.value.length);
                div.innerHTML = `<p class="item">${word}</p>`;
                listContainer.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

searchBtn.addEventListener("click", async () => {
    if (searchInput.value.trim().length < 1) {
        alert("Please enter a character name");
        return;
    }

    showContainer.innerHTML = "";
    const url = `${BASE_URL}characters?name=${searchInput.value}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data.results.length > 0) {
            data.data.results.forEach((element) => {
                showContainer.innerHTML += `
                    <div class="card-container">
                        <div class="container-character-image">
                            <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}"/>
                        </div>
                        <div class="container-character-name">${element.name}</div>
                        <div class="container-character-description">${element.description || "No description available."}</div>
                    </div>`;
            });
        } else {
            showContainer.innerHTML = "<p>No characters found.</p>";
        }
    } catch (error) {
        console.error("Error fetching character data:", error);
    }
});

// Optional: Call a search on page load, or you can remove this if you want to wait for user input
// window.onload = () => {
//     getResults();
// };
