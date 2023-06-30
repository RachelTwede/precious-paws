// Use me for interacting with the JSON

export async function getAnimalsByCategory(category) {
  //FIXME
  const response = await fetch(`/json/animalList.json`);
  return response.json();
}