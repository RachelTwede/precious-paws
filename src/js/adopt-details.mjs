import { renderWithTemplate, renderListWithTemplate, loadSnippet } from "/js/utilities.mjs";
import { getAnimalsByCategory } from "./model.mjs";
// Need to handle main dogs cats other



function animalListTemplate(animal) {
  let htmlString = "<div>";
  htmlString += `<img src="${animal.photoURL}">`;
  htmlString += `<h2>${animal.name}</h2>`;
  htmlString +=  `<p>Age: ${animal.age}</p>`
  htmlString +=  `<p>Gender: ${animal.gender}</p>`
  htmlString += "</div>";
  return htmlString;
}

export async function showAdoptPage(urlParameter) {
  // Get parent elements
  let insertionElement = document.querySelector(".dynamic-list");

  if(!urlParameter) {
    const adoptFn = loadSnippet("/snippets/adopt-main.html");
    renderWithTemplate(adoptFn, insertionElement);
  } else {
    // Get list of animals from the model
    const animalList = await getAnimalsByCategory(urlParameter);
    renderListWithTemplate(animalListTemplate, insertionElement, animalList[urlParameter]);
  }
}




