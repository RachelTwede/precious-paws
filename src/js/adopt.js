import { getURLParam, addHeaderNavFooter } from "/js/utilities.mjs";
import { showAdoptPage } from "/js/adopt-details.mjs";

const category = getURLParam("category");
showAdoptPage(category);
addHeaderNavFooter();
