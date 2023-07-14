export function getURLParam(param) {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  return urlParam.get(param);
}

//why not just write the async function as the function itself?
//why do we need to "return" it?
export function loadPartial(path) {
  return async function() {
    const response = await fetch(path);
    if (response.ok) {
      const template = await response.text();
      return template;
    }
  };
}

export async function renderWithTemplate(templateFunction, insertionElement, data, callback, position = "afterbegin", clear = true) {
  if(clear) {
    insertionElement.innerHTML = "";
  }
  const htmlString = await templateFunction(data);
  insertionElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
    callback(data);
  }
}

export function renderListWithTemplate(templateFunction, insertionElement, list, position="afterbegin", clear = true) {
  if(clear) {
    insertionElement.innerHTML = "";
  }
  const htmlString = list.map(templateFunction);
  insertionElement.insertAdjacentHTML(position, htmlString.join(""));
}

function setMenuListener() {
  let parentElement = document.querySelector("header");
  let navElement = document.querySelector(".nav");
  const overlayElement = document.querySelector(".overlay");
  parentElement.addEventListener("click", function(e) {
    if(e.target && e.target.closest("#menu-button")) {
      e.target.closest("#menu-button").classList.toggle("change");
      navElement.classList.toggle("visible");
      overlayElement.classList.toggle("darken");
    }
  });
}

export async function addHeaderNavFooter() {
  const headerElement = document.querySelector("header");
  const navElement = document.querySelector(".nav");
  const footerElement = document.querySelector("footer");

  const headerFn = loadPartial("/partials/header.html");
  const navFn = loadPartial("/partials/nav.html");
  const footerFn = loadPartial("/partials/footer.html");

  renderWithTemplate(headerFn, headerElement);
  renderWithTemplate(navFn, navElement);
  renderWithTemplate(footerFn, footerElement);

  setMenuListener();
}

export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function readFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function joinArraysFromJSON(fullJSON) {
  let animalsArray = fullJSON["dogs"];
  animalsArray = animalsArray.concat(fullJSON["cats"]);
  let otherKeys = Object.keys(fullJSON["other"]);
  otherKeys.forEach((key) => {
    animalsArray = animalsArray.concat(fullJSON.other[key]);
  })
  return animalsArray;
}