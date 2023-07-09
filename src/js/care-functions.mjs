import { getAnimalFactFromAPI } from "./model.mjs";
import { renderWithTemplate } from "/js/utilities.mjs";


const catURL = "https://catfact.ninja/fact?max_length=140";
const dogURL = "https://24pwnslrh0.execute-api.us-west-2.amazonaws.com/prod/dogfact";

export function catFactTemplate(fact) {
  let htmlString = "<h3>Random Cat Fact:</h3>";
  htmlString += `<p>${fact}</p>`;
  return htmlString;
}
export function dogFactTemplate(fact) {
  let htmlString = `<h3>Random Dog Fact:</h3>`;
  htmlString += `<p>${fact}</p>`;
  return htmlString;
}

export async function buildAnimalFacts() {
  const catElement = document.querySelector("#cat-fact");
  const dogElement = document.querySelector("#dog-fact");

  const catFact = await getAnimalFactFromAPI(catURL);
  const dogFact = await getAnimalFactFromAPI(dogURL);

  renderWithTemplate(catFactTemplate, catElement, catFact.fact, null, "beforeend", false);
  renderWithTemplate(dogFactTemplate, dogElement, dogFact.fact, null, "beforeend", false);
}