import { getURLParam, addHeaderNavFooter } from "/js/utilities.mjs";
import { buildAdoptPage } from "/js/adopt-details.mjs";

const category = getURLParam("category");
buildAdoptPage(category);
addHeaderNavFooter();