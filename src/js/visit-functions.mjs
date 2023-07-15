import { renderWithTemplate, readFromLocalStorage, joinArraysFromJSON } from "/js/utilities.mjs";
import { getAnimalListJSON } from "./model.mjs";

function favoritesTemplate(animal) {
  let htmlString = `<div>`;
  htmlString += `<img src="${animal.photoURL}">`;
  htmlString += `<p>Name: ${animal.name}</p>`;
  if (animal.category) {
    htmlString +=  `<p>Type: ${animal.category}</p>`;
  }
  htmlString +=  `<p>Age: ${animal.age}</p>`;
  htmlString +=  `<p>Gender: ${animal.gender}</p>`;
  htmlString += `</div>`;
  return htmlString;
}

function validateDateInput() {
  var today = new Date();

  var month = today.getMonth() + 1;
  var day = today.getDate();
  var year = today.getFullYear();

  if(month < 10)
    month = '0' + month.toString();
  if(day < 10)
    day = '0' + day.toString();
  var minDate = year + "-" + month + "-" + day;    

  var dateInput = document.querySelector("#date");
  dateInput.setAttribute("min", minDate); 
}

export async function buildVisitPage() {
  const parentElement = document.querySelector(".your-choices");
  const favoriteIDs = readFromLocalStorage("precious-paws-animals");
  const fullAnimalList = await getAnimalListJSON();
  const animalsArray = joinArraysFromJSON(fullAnimalList);

  for(let i = 0; i < favoriteIDs.length; i++) {
    for(let j = 0; j < animalsArray.length; j++) { 
      if (favoriteIDs[i] == animalsArray[j].id) {
        renderWithTemplate(favoritesTemplate, parentElement, animalsArray[j], null, "beforeend", false);
      }
    }
  }

  validateDateInput();
}

// .map, .find, etc, take a single function as an argument.
  // The function they take as an argument has a single argument.
  // .map will call the function for every item in the array .map is being called on,
  // passing in the current item as the callback's argument.
  // for(let i = 0; i < favoriteIDs.length; i++) {
  //   const animal = animalsArray.find((a) => a.id == favoriteIDs[i]);
  //   renderWithTemplate(favoritesTemplate, parentElement, animal, null, "beforeend", false);
  // }