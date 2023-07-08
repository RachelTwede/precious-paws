// Use this file for interacting with the JSON and external APIs

export async function getAnimalListJSON() {
  const response = await fetch(`/json/animalList.json`);
  return response.json();
}

export async function getAnimalFactFromAPI(url) {
  const response = await fetch(url);
  return response.json();

  // return fetch("https://catfact.ninja/fact?max_length=140")
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error(`HTTP error: ${response.status}`);
  //   }
  //   return response.json();
  // })
  // .catch((error) => {
  //   //code for displaying error message
  // });
}
