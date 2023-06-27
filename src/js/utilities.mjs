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

//why not just write the async function as the function itself?
//why do we need to "return" it?
function loadTemplate(path) {
  return async function() {
    const response = await fetch(path);
    if (response.ok) {
      const template = await response.text();
      return template;
    }
  };
}

//what's the data parameter for, again? especially when passed to the templateFunction?
//also, do I need callback?
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

export async function addHeaderNavFooter() {
  const headerElement = document.querySelector("header");
  const navElement = document.querySelector(".nav");
  const footerElement = document.querySelector("footer");

  const headerFn = loadTemplate("/snippets/header.html");
  const navFn = loadTemplate("/snippets/nav.html");
  const footerFn = loadTemplate("/snippets/footer.html");

  renderWithTemplate(headerFn, headerElement);
  renderWithTemplate(navFn, navElement);
  renderWithTemplate(footerFn, footerElement);

  setMenuListener();
}