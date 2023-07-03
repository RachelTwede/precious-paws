import { getURLParam, addHeaderNavFooter } from "/js/utils.mjs";
import { showAdoptPage } from "/js/adopt-details.mjs";

const category = getURLParam("category");
showAdoptPage(category);
addHeaderNavFooter();
