// Use this file for interacting with the JSON and external APIs

export async function getAnimalListJSON() {
  const response = await fetch(`/json/animalList.json`);
  return response.json();
}

export async function getAnimalFactFromAPI(url) {
  const response = await fetch(url);
  return response.json();
}


