import { description } from "./js/view.js";
import { apiUrl } from "./js/view.js";

//   Getting the all elements in the DOM
const input = document.querySelector("input[type=text]");

input.addEventListener("keyup", function (event) {
  const id = Number(event.target.value);
  console.log(id);
});

const containerItemsPokemon = document.querySelector(
  ".container--items--pokemons"
);

const sectionGallery = document.querySelector(" .gallery");

const btnOpen = document.querySelector(".btn--open");

const closeIcone = document.querySelector(".btn--close");
const navBar = document.querySelector("nav");
const listLink = document.querySelector("ul");
btnOpen.onclick = function (e) {
  const classOpen = e.target.classList.contains("icon--open");

  if (classOpen) {
    e.target.classList.add("hidden");
    closeIcone.classList.remove("hidden");
    listLink.classList.add("flex", "absolute", "flex-col");
    navBar.classList.remove("hidden", "flex-col");
  }
  closeIcone.addEventListener("click", (_) => {
    e.target.classList.remove("hidden");
    closeIcone.classList.add("hidden");
    listLink.classList.remove("flex", "absolute", "flex-col");
    navBar.classList.add("hidden");
  });
}.bind(btnOpen);

async function pegarPokemon(url) {
  const pokemon = await (await fetch(url)).json();
  const { results } = pokemon;
  results.map(({ name, url }) => xaP(name, url));
}
const divNew = document.createElement("div");
async function xaP(name, url) {
  const dadosAlll = await (await fetch(url)).json();

  const {
    sprites: { front_default },
  } = dadosAlll;
  const html = `  <figure
              class="card-items card--01 border shadow-2 group hover:bg-amber-400/10 hover:-translate-y-2 duration-150   w-full rounded-md border-orange-500/15 flex flex-col items-center p-4 bg-white cursor-pointer"
            >
              <img
                class="h-24 w-24"
                src="${front_default}"
                alt=""
                width="150"
                height="150"
              />
              <h3 class="text-xl font-bold mt-2">${name}</h3>
              <p class="text-gray-700 text-center">${description}</p>
              <button class="mt-2 px-4 py-2 bg-orange-700/90 text-white w-full cursor-pointer rounded hover:bg-orange-500 trasition duration-150">
                More details
              </button>
            </figure>`;

  containerItemsPokemon.insertAdjacentHTML("afterbegin", html);

  setTimeout(() => {
    const lastFourFigures = containerItemsPokemon.querySelectorAll("figure");
    const lastFour = Array.from(lastFourFigures).slice(0, 6);
    // lastFour.map(element => divNew.innerHTML+= element).join("")

    sectionGallery.innerHTML = "";
    lastFour.forEach((element) =>
      sectionGallery.appendChild(element.cloneNode(true))
    );
  }, Math.random() * 400);
}

pegarPokemon(apiUrl);
