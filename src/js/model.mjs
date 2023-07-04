// Use me for interacting with the JSON

export async function getAnimalListJSON(category) {
  const response = await fetch(`/json/animalList.json`);
  // let json = response.json();
  // console.log(json[category]);
  // return json[category];
  return response.json();
}