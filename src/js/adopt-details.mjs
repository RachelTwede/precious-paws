import { renderWithTemplate, renderListWithTemplate, loadSnippet } from "/js/utilities.mjs";
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
  htmlString += `<button>Save for Visit</button>`;
  htmlString += "</div>";
  return htmlString;
}

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
}




