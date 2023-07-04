import { renderWithTemplate, renderListWithTemplate, loadSnippet, saveToLocalStorage, readFromLocalStorage } from "/js/utilities.mjs";
import { getAnimalsByCategory } from "./model.mjs";

function animalListTemplate(animal) {
  let htmlString = `<div class="adopt-card">`;
  htmlString += `<img src="${animal.photoURL}">`;
  htmlString += `<h2>${animal.name}</h2>`;
  if (animal.category) {
    htmlString +=  `<p>Type: ${animal.category}</p>`
  }
  htmlString +=  `<p>Age: ${animal.age}</p>`
  htmlString +=  `<p>Gender: ${animal.gender}</p>`
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
    button.addEventListener("click", saveFavorite)
  })
}

// The main function for the page
export async function showAdoptPage(urlParameter) {
  // Get parent elements
  let insertionElement = document.querySelector(".adopt-grid");

  // Set page content if no animal is selected
  if(!urlParameter) {
    const adoptFn = loadSnippet("/snippets/adopt-main.html");
    renderWithTemplate(adoptFn, insertionElement);
  //Set page content for "other" category
  } else if(urlParameter == "other") {
    const animalList = await getAnimalsByCategory(urlParameter);
    const otherAnimals = animalList[urlParameter];
    let subCategories = Object.keys(otherAnimals);
    subCategories.forEach((subCategory) => {
      renderListWithTemplate(animalListTemplate, insertionElement, otherAnimals[subCategory], "beforeend", false);
    })
  //Set page content for cats/dogs
  } else {
    // Get list of animals from the model
    const animalList = await getAnimalsByCategory(urlParameter);
    renderListWithTemplate(animalListTemplate, insertionElement, animalList[urlParameter]);
  }

  // Add event listeners for buttons
  setFavoriteButtonListener();
}




