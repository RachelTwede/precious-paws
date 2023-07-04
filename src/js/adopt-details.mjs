import { renderWithTemplate, renderListWithTemplate, loadSnippet, saveToLocalStorage, readFromLocalStorage } from "/js/utilities.mjs";
import { getAnimalListJSON } from "./model.mjs";

function adoptIntroTemplate(headingData) {
  let htmlString = `<div>`
  htmlString += `<h2>${headingData}</h2>`;
  htmlString += `<p>When you choose to adopt a pet, not only do you gain a new best friend, 
    but you also save a life in the process. </p>`;
  htmlString += `<p>There is a small adoption fee for each animal. This fee covers the cost
    of vaccinations, the spay/neuter procedure (for cats, dogs, and rabbits), microchipping, 
    and deworming. Unless otherwise noted, the fee for each animal type is as follows:</p>`;
  htmlString += `<ul>
      <li>Dogs: $100</li>
      <li>Cats: $55</li>
      <li>Rabbits: $30</li>
      <li>Guinea Pigs: $25</li>
      <li>Lizards: $40</li>
      <li>Birds: $20</li>
    </ul>`;
  htmlString += `</div>`;
  return htmlString;
}

function animalListTemplate(animal) {
  let htmlString = `<div class="adopt-card">`;
  htmlString += `<img src="${animal.photoURL}">`;
  htmlString += `<h2>${animal.name}</h2>`;
  if (animal.category) {
    htmlString +=  `<p>Type: ${animal.category}</p>`;
  }
  htmlString +=  `<p>Age: ${animal.age}</p>`;
  htmlString +=  `<p>Gender: ${animal.gender}</p>`;
  htmlString += `<button id="${animal.id}">Save for Visit</button>`;
  htmlString += "</div>";
  return htmlString;
}

function saveFavorite(e) {
  let favoriteID = e.target.id;
  let favoritesList = readFromLocalStorage("precious-paws-animals") || [];
  if (!Array.isArray(favoritesList)) {
    favoritesList = [favoritesList];
  }
  
  if (favoritesList && !favoritesList.includes(favoriteID)) {
    favoritesList.push(favoriteID);
  } else if(!favoritesList) {
    favoritesList = [favoriteID];
  }
  saveToLocalStorage("precious-paws-animals", favoritesList);
}

function setFavoriteButtonListener() {
  const buttons = document.querySelectorAll(".adopt-card button");
  Array.from(buttons).map((button) => {
    button.addEventListener("click", saveFavorite);
  })
}

// The main function for the page
export async function showAdoptPage(urlParameter) {
  // Get parent elements
  let introElement = document.querySelector(".adopt-intro");
  let listElement = document.querySelector(".adopt-grid");

  // Set page content if no animal is selected
  if(!urlParameter) {
    const adoptFn = loadSnippet("/snippets/adopt-main.html");
    renderWithTemplate(adoptFn, listElement);
  //Set page content for "other" category
  } else if(urlParameter == "other") {
    const animalList = await getAnimalListJSON(urlParameter);
    const otherAnimals = animalList[urlParameter];
    let subCategories = Object.keys(otherAnimals);
    subCategories.forEach((subCategory) => {
      renderListWithTemplate(animalListTemplate, listElement, otherAnimals[subCategory], "beforeend", false);
    })
    renderWithTemplate(adoptIntroTemplate, introElement, "Other Adoptable Animals");
  //Set page content for cats/dogs
  } else {
    // Get list of animals from the model
    const animalList = await getAnimalListJSON(urlParameter);
    renderListWithTemplate(animalListTemplate, listElement, animalList[urlParameter]);
    renderWithTemplate(adoptIntroTemplate, introElement, `Adoptable ${urlParameter}`);
  }

  // Add event listeners for buttons
  setFavoriteButtonListener();
}




